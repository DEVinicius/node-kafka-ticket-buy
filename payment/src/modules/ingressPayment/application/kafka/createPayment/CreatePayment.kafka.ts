import { ICreateIngressPaymentDTO } from './../../../repository/dto/ICreateIngressPayment.dto';
import { IIngressPaymentRepository } from './../../../repository/IIngressPayment.repository';
import { Consumer } from "kafkajs";
import { KAFKA_GROUP_ID, PAYMENT_TOPIC } from "../../../../../infra/env/kafka.env";
import { kafka } from "../../../../../infra/kafka";
import { ICreatePaymentKafka } from "./ICreatePayment.kafka";

export class CreatePaymentKafka implements ICreatePaymentKafka {

    private consumer: Consumer;

    constructor(
        private ingressPaymentRepository: IIngressPaymentRepository
    ) {
        this.consumer = kafka.consumer({
            groupId: KAFKA_GROUP_ID,
            
        });
    }

    public async receivePaymentSolicitation(): Promise<void> {
        await this.consumer.connect();

        await this.consumer.subscribe({
            topic: PAYMENT_TOPIC,
            fromBeginning: true,
        })

        await this.consumer.run({
            eachMessage: async({topic, partition, message}) => {
                try {
                    const data = {
                        partition,
                        offset: message.offset,
                        value: message.value,
                    }

                    const paymentSolicitation = JSON.parse(
                        Buffer.from(data.value as Buffer).toString()
                    ) as ICreateIngressPaymentDTO;

                    await this.ingressPaymentRepository.create(paymentSolicitation);
                } catch (error) {
                    console.log(error.message);
                }
            }
        })
    }
}