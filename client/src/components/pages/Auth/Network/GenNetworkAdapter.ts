import axios from 'axios';

const headers = {
        'Content-Type': 'application/json',
        'X-Content-Type-Options' : 'nosniff'};

const opts = {
    withCredentials: true, //true,
    headers: headers
};

class RequestService {
    get(url : string) {
         return axios.get(url, opts);
    };

    post(url : string, data : any) {
        return axios.post(url, data, opts)
    };

    put(url : string, data : any) {
        return axios.put(url, data, opts)
    };

    patch(url : string, data : any) {
        return axios.patch(url, data, opts)
    };

    delete(url : string) {
        return axios.delete(url, opts);
    };
};

export default new RequestService();