import {Request, Response} from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';
import User from './../../../Model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/*
app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

*/

const login = async (req : Request, res : Response) => {
    const { email, password } = req.body;

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
        return sendResponse({res : res, status : 400, data : user})

      }
    return sendResponse({res : res, status : 400, data : {msg : "Invalid Credentials"}})
    //return true;
}

export default login;