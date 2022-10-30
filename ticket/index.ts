require('dotenv').config();
import Express, { json, Request, Response } from 'express';
import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import { IIngressRequest } from './src/modules/ingress/interfaces/IIngress.request';
import { CreateIngressService } from './src/modules/ingress/application/services/createIngressService/createIngress.service';
import { PaymentCommunication } from './src/modules/ingress/application/kafka/paymentCommunication/paymentCommunication.kafka';
import { PrismaIngressRepository } from './src/modules/ingress/repository/implementation/PrismaIngress.repository';

const app = Express();

app.use(json());
app.use(cors());

app.post('/ticket/create', async (request: IIngressRequest, response: Response) => {
    const { roomCode, sessionId, clientDocument } = request.body;

    const createIngressService = new CreateIngressService(
        new PaymentCommunication(),
        new PrismaIngressRepository()
    );

    const ingress = await createIngressService.execute({
        clientDocument,
        roomCode,
        sessionId
    });

    return response.json(ingress)
});

app.listen("3000", () => {
    console.log("WORKING ON PORT 3000")
})
