import {Request, Response} from 'express';
import sendResponse from './../../../ExpressUtils/sendResponse';

const getMe = async (req : Request, res : Response) => {
    return sendResponse({res : res, status : 200, data : {test : "testouille"}})
    //return true;
}

export default getMe;