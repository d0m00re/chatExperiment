import {Request, Response} from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';
import User from './../../../Model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req : Request, res : Response) => {
  //  return sendResponse({res : res, status : 400, data : null})
    
    const { email, password } = req.body;
    //return       res.status(400).send("All input is required");

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (!user)
        return sendResponse({res : res, status : 400, data : {msg : "user not found"}})


    if (user && (await bcrypt.compare(password, user.password ?? ''))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY ?? "",
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return sendResponse({res : res, status : 200, data : user})

      }
    return sendResponse({res : res, status : 400, data : {msg : "Invalid Credentials"}})
    //return true;
}

export default login;