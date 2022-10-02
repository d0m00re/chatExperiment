import {Request, Response} from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';
import jwt from 'jsonwebtoken';;


const getMe = async (req : any, res : any) => {
    console.log("getme : token : ")
    console.log(req?.user)
    return sendResponse({res : res, status : 200, data : req?.user})
    //return true;
}

export default getMe;