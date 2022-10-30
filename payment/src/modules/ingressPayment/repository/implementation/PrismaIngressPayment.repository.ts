import { PrismaClient } from '@prisma/client';
import { IngressPayment } from '../../domain/models/IngressPayment.model';
import { ICreateIngressPaymentDTO } from '../dto/ICreateIngressPayment.dto';
import { IIngressPaymentRepository } from './../IIngressPayment.repository';

export class PrismaIngressPaymentRepository implements IIngressPaymentRepository {
    
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    public async create(data: ICreateIngressPaymentDTO): Promise<IngressPayment> {
        const payment = await this.prisma.payment.create({
            data: {
                clientDocument: data.clientDocument,
                ingressCode: data.ingressCode,
                price: data.price,
                status: false
            }
        })

        return new IngressPayment(payment.id,
             parseFloat(payment.price.toString()), payment.clientDocument, payment.ingressCode, payment.status)
    }
}