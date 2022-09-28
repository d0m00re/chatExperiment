import { Request, Response } from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';
import User from './../../../Model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const register = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
        return sendResponse({ res: res, status: 400, data: { msg: "All field are required" } })
    }

    // check existing user
    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return sendResponse({ res: res, status: 400, data: { msg: "User already exist. Please login" } })
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY ?? "wtf",
        {
            expiresIn: "200h",
        }
    );
    // save user token
    user.token = token;

    // return new user

    return sendResponse({ res: res, status: 200, data: user })
    //return true;
}

export default register;