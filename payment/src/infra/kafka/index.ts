import { KAFKA_BROKER } from '../env/kafka.env';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: [
        KAFKA_BROKER
    ]
});

export {
    kafka
}