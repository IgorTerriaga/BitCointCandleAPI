import { Channel, connect } from "amqplib";
import { config } from "dotenv";
import http from 'http';
import CandleController from "../controllers/CandleController";
import { Server } from "socket.io";
import { Candle } from "../models/CandleModel";

config()

export default class CandleMessageChannel {
    private _channel!: Channel;
    private _candleCtrl: CandleController;
    private _io: Server;

    constructor(server: http.Server) {
        this._candleCtrl = new CandleController();
        this._io = new Server(server, { cors: { origin: process.env.SOCKET_CLIENT_SERVER, methods: ['GET', 'POST'] } });
        this._io.on('connection', () => { console.log('Web socket connection..') });

    }
    private async createMessageCandle() {
        try {
            const connection = await connect(process.env.AMQP_SERVER ?? 'amqp://guest:guest@localhost:5672');
            this._channel = await connection.createChannel();
            this._channel.assertQueue(process.env.QUEUE_NAME ?? 'candles')

        } catch (err) {
            console.log('Connection to rabbitMQ failed');
            console.log(err);
        }
    }
    async consumeMessage() {
        await this.createMessageCandle();
        if (this._channel) {
            const queue_name = process.env.QUEUE_NAME ? process.env.QUEUE_NAME : 'candles'
            this._channel.consume(queue_name, async msg => {
                if (msg !== null && msg !== undefined) {
                    const candleObj = JSON.parse(msg?.content.toString());
                    console.log("Message received");
                    console.log(candleObj);
                    this._channel.ack(msg);

                    const candle: Candle = candleObj;
                    await this._candleCtrl.save(candle);
                    console.log("Candle saved to db");
                    this._io.emit(process.env.SOCKET_EVENT_NAME ?? 'newCandle', candle)
                    console.log("new candle emited by web socket");

                }
                console.log("Candle consumed start..")
            });
        }
    }


}