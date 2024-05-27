"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleModel = void 0;
const mongoose_1 = require("mongoose");
;
const schema = new mongoose_1.Schema({
    currency: { type: String, required: true },
    finalDateTime: { type: Date, required: true },
    open: { type: String, required: true },
    close: { type: String, required: true },
    high: { type: String, required: true },
    low: { type: String, required: true },
    color: { type: String, required: true },
});
exports.CandleModel = (0, mongoose_1.model)('Candle', schema);
