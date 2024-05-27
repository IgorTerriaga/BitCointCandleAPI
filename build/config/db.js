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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (0, dotenv_1.config)();
    yield (0, mongoose_1.connect)((_a = process.env.MONGODB_CONNECT_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost/candles');
});
exports.default = connectToMongoDB;
