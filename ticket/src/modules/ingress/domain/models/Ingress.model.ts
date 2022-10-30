export class Ingress {
    constructor(
        public sessionId: number,
        public id: number,
        public roomCode: number,
        public clientDocument: string,
        public isPaid: boolean,
    ){}
}