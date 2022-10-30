export interface ICreatePaymentKafka {
    receivePaymentSolicitation():Promise<void>;
}