import express, {Request, Response} from 'express';
import Api from './API/User/routes';
import * as dotenv from 'dotenv';
import User from "./Model/user.model";
import auth from './API/User/middleware/auth';
import cors from 'cors';
import * as controller from './API/User/controller';

//var cors = require('cors')
dotenv.config();

import * as moongoose from './config/database';

const app = express();


//CORS middleware
/*
const allowCrossDomain = function(req : any, res : any, next : any) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}*/

//app.use(allowCrossDomain)
app.use(express.json());


//app.use(cors({credentials: true}))
app.use(cors())

// Logic goes here
moongoose.connect();

const C_BASE_ENDPOINT = '/api';
app.post('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

/*app.get("/api/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
*/

// dont works, check lter cors problem
app.use('/api/auth', Api);

/*
app.get("/api/auth/me", controller.getMe);
app.post("/api/auth/login", controller.login);
app.post("/api/auth/register", controller.register);
app.post("/api/auth/forgotPassword", controller.forgotPassword);
*/
export default app;