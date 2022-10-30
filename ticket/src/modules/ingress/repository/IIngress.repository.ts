import { ICreateIngressDTO } from './dto/createIngress.dto';
import { Ingress } from "../domain/models/Ingress.model";

export interface IIngressRepository {
    create(data:ICreateIngressDTO): Promise<Ingress>;
}