import { PrismaIngressPaymentRepository } from './modules/ingressPayment/repository/implementation/PrismaIngressPayment.repository';
require('dotenv').config();
import Express from 'express';
import { CreatePaymentKafka } from './modules/ingressPayment/application/kafka/createPayment/CreatePayment.kafka';

const app = Express();

const createIngressPayment = new CreatePaymentKafka(
    new PrismaIngressPaymentRepository()
);

app.listen("3001", () => {
    console.log("SERVER RUNNING ON PORT 3001")
    createIngressPayment.receivePaymentSolicitation();
})