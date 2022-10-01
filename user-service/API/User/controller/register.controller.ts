import { Request, Response } from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';
import bcrypt from 'bcryptjs';
import * as db from "./../db";
import * as jwt from './../../../Service/jwt';

const register = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
        return sendResponse({ res: res, status: 400, data: { msg: "All field are required" } })
    }

    // check existing user
    const oldUser = await db.userFindOneWithEmail({email}) //User.findOne({ email });

    if (oldUser) {
        return sendResponse({ res: res, status: 400, data: { msg: "User already exist. Please login" } })
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await db.userCreateOne({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
    });
    
    // Create token
    const token = jwt.jwtSign(
        {id: user._id, email },
    );
    // save user token
    user.token = token;

    // return new user
    return sendResponse({ res: res, status: 200, data: user })
}

export default register;