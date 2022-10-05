import {Response} from 'express';

interface ISendResponse {
    res : Response;
    status : number;
    data : any;
}

const sendResponse = (props : ISendResponse) => {
    return props.res
            .status(props.status).send(props.data);
}

export default sendResponse;