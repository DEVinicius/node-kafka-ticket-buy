import { ICreateIngressPaymentDTO } from './dto/ICreateIngressPayment.dto';
import { IngressPayment } from "../domain/models/IngressPayment.model";

export interface IIngressPaymentRepository {
    create(data: ICreateIngressPaymentDTO): Promise<IngressPayment>;
}