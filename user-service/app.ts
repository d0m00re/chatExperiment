import express, {Request, Response} from 'express';
import Api from './API/User/routes';
import * as dotenv from 'dotenv';
dotenv.config();
import * as moongoose from './config/database';
import cors from 'cors';


const app = express();

//app.use(allowCrossDomain)
app.use(express.json());

//app.use(cors({credentials: true}))
app.use(cors())

// Logic goes here
moongoose.connect();

app.post('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

// dont works, check lter cors problem
app.use('/api/auth', Api);
export default app;