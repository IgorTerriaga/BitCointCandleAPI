import { Channel } from "amqplib";
import { config } from "dotenv";
import http from 'http';
import CandleController from "../controllers/CandleController";
import { Server } from "socket.io";

config()

export default class CandleMessageChannel {
    // private _channel: Channel;
    private _candleCtrl: CandleController;
    private _io: Server;

    constructor(server: http.Server) {
        this._candleCtrl = new CandleController();
        this._io = new Server(server, { cors: { origin: process.env.SOCKET_CLIENT_SERVER, methods: ['GET', 'POST'] } });
        this._io.on('connection',()=>{console.log('Web socket connection..')});
    }
}