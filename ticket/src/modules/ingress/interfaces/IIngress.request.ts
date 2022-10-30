import { Request } from "express";
import { ICreateIngressService } from "./ICreateIngress.service";

export interface IIngressRequest extends Request {
    body: ICreateIngressService
}