import {Request, Response} from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';

const forgotPassword = async (req : Request, res : Response) => {
    return sendResponse({res : res, status : 200, data : {test : "testouille"}})
    //return true;
}

export default forgotPassword;