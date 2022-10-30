import { PAYMENT_TOPIC } from '../../../../../infra/env/kafka.env';
import { kafka } from '../../../../../infra/kafka';
import { Partitioners, Producer } from 'kafkajs';
import { ISendPaymentSolicitationKafka } from './dto/ISendPaymentSolicitation.kafka';
import { IPaymentCommunicationKafka } from './IPaymentCommunication.kafka';
export class PaymentCommunication implements IPaymentCommunicationKafka {
    
    private producer: Producer;
    
    constructor() {
        this.producer = kafka.producer({
            createPartitioner: Partitioners.DefaultPartitioner
        });
    }
    public async sendPaymentSolicitation(data: ISendPaymentSolicitationKafka): Promise<void> {
        await this.producer.connect();
        await this.producer.send({
            topic: PAYMENT_TOPIC,
            messages: [
                {
                    value: JSON.stringify(data)
                }
            ],
            acks: 1
        })

    }
}