import { Router } from "express";
import CandleController from "../controllers/CandleController";


const candleRouter = Router()

const candleCrtl = new CandleController();

candleRouter.get('/:quantity', async (req, res) => {
    const quantity = parseInt(req.params.quantity);
    const lastCandle = await candleCrtl.findLastCandles(quantity);
    return res.json(lastCandle);
});
export { candleRouter };