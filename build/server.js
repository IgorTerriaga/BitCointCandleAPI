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
const app_1 = require("./app");
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./config/db"));
const mongoose_1 = require("mongoose");
const CandleMessageChannel_1 = __importDefault(require("./messages/CandleMessageChannel"));
const createServer = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dotenv_1.config)();
    yield (0, db_1.default)();
    const PORT = process.env.PORT;
    const server = app_1.app.listen(PORT, () => console.log("Rodando..."));
    const candleMsgChannel = new CandleMessageChannel_1.default(server);
    candleMsgChannel.consumeMessage();
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.connection.close();
        server.close();
        console.log("App server and connection to MongoDB closed");
    }));
});
createServer();
