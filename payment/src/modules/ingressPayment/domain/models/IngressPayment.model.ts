export class IngressPayment {
    constructor(
        public id: number,
        public price: number,
        public clientDocument: string,
        public ingressCode: number,
        public status: boolean
    ) {}
}