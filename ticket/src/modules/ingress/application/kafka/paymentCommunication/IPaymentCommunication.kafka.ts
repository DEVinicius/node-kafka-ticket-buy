import { ISendPaymentSolicitationKafka } from "./dto/ISendPaymentSolicitation.kafka";

export interface IPaymentCommunicationKafka {
    sendPaymentSolicitation(data: ISendPaymentSolicitationKafka): Promise<void>;
}