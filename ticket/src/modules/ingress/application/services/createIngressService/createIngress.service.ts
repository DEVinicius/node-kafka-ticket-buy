import { Ingress } from './../../../domain/models/Ingress.model';
import { ICreateIngressService } from "src/modules/ingress/interfaces/ICreateIngress.service";
import { IIngressRepository } from "../../../repository/IIngress.repository";
import { IPaymentCommunicationKafka } from "../../kafka/paymentCommunication/IPaymentCommunication.kafka";

export class CreateIngressService {
    constructor(
        private paymentCommunication: IPaymentCommunicationKafka,
        private ingressRepository: IIngressRepository
    ) {}

    public async execute({
        clientDocument,
        roomCode,
        sessionId
    }: ICreateIngressService): Promise<Ingress> {
        const ingress = await this.ingressRepository.create({
            clientDocument,
            roomCode,
            sessionId
        });

        await this.paymentCommunication.sendPaymentSolicitation({
            clientDocument: ingress.clientDocument,
            ingressCode: ingress.id,
            price: 24.90
        })

        return ingress
    }
}