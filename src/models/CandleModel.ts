import { Document, Schema, model } from 'mongoose';

export interface Candle extends Document {
    currency: string;
    finalDateTime: Date;
    open: String;
    close: String
    high: String
    low: String
    color: String
};

const schema = new Schema<Candle>({
    currency: { type: String, required: true },
    finalDateTime: { type: Date, required: true },
    open: { type: String, required: true },
    close: { type: String, required: true },
    high: { type: String, required: true },
    low: { type: String, required: true },
    color: { type: String, required: true },
})

export const CandleModel = model<Candle>('Candle', schema);
