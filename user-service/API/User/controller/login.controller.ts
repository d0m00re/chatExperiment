import {Request, Response} from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';
import bcrypt from 'bcryptjs';
import * as db from "./../db";
import * as jwt from './../../../Service/jwt';

const login = async (req : Request, res : Response) => {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await db.userFindOneWithEmail({ email });

    if (!user)
        return sendResponse({res : res, status : 400, data : {msg : "user not found"}})

    if (await bcrypt.compare(password, user.password ?? '')) {
        // Create token
        const token = jwt.jwtSign({
          id: user._id,
          email
        });
  
        // save user token
        user.token = token;
  
        // user
        return sendResponse({res : res, status : 200, data : user})
      }
    return sendResponse({res : res, status : 400, data : {msg : "Invalid Credentials"}})
}

export default login;