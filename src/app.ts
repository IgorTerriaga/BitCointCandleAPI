import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express()

app.use(cors());
app.use(express.json());

app.use(logger('dev'));

export { app };