import { config } from 'dotenv';
import {connect} from 'mongoose';


const connectToMongoDB = async() => {
    config()
    await connect(process.env.MONGODB_CONNECT_URL ?? 'mongodb://localhost/candles')
}
export default connectToMongoDB;