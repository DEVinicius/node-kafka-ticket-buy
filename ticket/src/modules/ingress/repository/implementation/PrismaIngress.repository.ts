import { PrismaClient } from '@prisma/client';
import { Ingress } from '../../domain/models/Ingress.model';
import { ICreateIngressDTO } from '../dto/createIngress.dto';
import { IIngressRepository } from './../IIngress.repository';

export class PrismaIngressRepository implements IIngressRepository {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }    

    public async create(data: ICreateIngressDTO): Promise<Ingress> {
        const ingress = await this.prisma.ingress.create({
            data: {
                roomCode: data.roomCode,
                isPaid: false,
                clientDocument: data.clientDocument,
                sessionId: data.sessionId
            }
        });


        return new Ingress(
            ingress.sessionId,
            ingress.id,
            ingress.roomCode,
            ingress.clientDocument,
            ingress.isPaid
        )
    }
}