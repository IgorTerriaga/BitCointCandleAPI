"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const dotenv_1 = require("dotenv");
const CandleController_1 = __importDefault(require("../controllers/CandleController"));
const socket_io_1 = require("socket.io");
(0, dotenv_1.config)();
class CandleMessageChannel {
    constructor(server) {
        this._candleCtrl = new CandleController_1.default();
        this._io = new socket_io_1.Server(server, { cors: { origin: process.env.SOCKET_CLIENT_SERVER, methods: ['GET', 'POST'] } });
        this._io.on('connection', () => { console.log('Web socket connection..'); });
    }
    createMessageCandle() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const connection = yield (0, amqplib_1.connect)((_a = process.env.AMQP_SERVER) !== null && _a !== void 0 ? _a : 'amqp://guest:guest@localhost:5672');
                this._channel = yield connection.createChannel();
                this._channel.assertQueue((_b = process.env.QUEUE_NAME) !== null && _b !== void 0 ? _b : 'candles');
            }
            catch (err) {
                console.log('Connection to rabbitMQ failed');
                console.log(err);
            }
        });
    }
    consumeMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createMessageCandle();
            if (this._channel) {
                const queue_name = process.env.QUEUE_NAME ? process.env.QUEUE_NAME : 'candles';
                this._channel.consume(queue_name, (msg) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (msg !== null && msg !== undefined) {
                        const candleObj = JSON.parse(msg === null || msg === void 0 ? void 0 : msg.content.toString());
                        console.log("Message received");
                        console.log(candleObj);
                        this._channel.ack(msg);
                        const candle = candleObj;
                        yield this._candleCtrl.save(candle);
                        console.log("Candle saved to db");
                        this._io.emit((_a = process.env.SOCKET_EVENT_NAME) !== null && _a !== void 0 ? _a : 'newCandle', candle);
                        console.log("new candle emited by web socket");
                    }
                    console.log("Candle consumed start..");
                }));
            }
        });
    }
}
exports.default = CandleMessageChannel;
