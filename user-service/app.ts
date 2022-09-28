import express, {Request, Response} from 'express';
import * as Api from './API';
import * as dotenv from 'dotenv';
import User from "./Model/user.model";
import auth from './API/User/middleware/auth';

dotenv.config();

import * as moongoose from './config/database';

const app = express();

app.use(express.json());

// Logic goes here
moongoose.connect();

const C_BASE_ENDPOINT = '/api';
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.get("/api/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.use('/api/auth', Api.UserApi);

export default app;