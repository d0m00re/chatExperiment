import axios from 'axios';

const headers = {};
        //'content-Type': 'application/json'};
        //,
        //'X-Content-Type-Options' : 'nosniff'};

const opts = {
  //  withCredentials: true, //true,
  //  headers: headers
};

const getCustomHeaderAuth = () => {
    let token = localStorage.getItem('token')

    return {
        headers : {
            "x-access-token" : token
        }
    }
};

class RequestService {
    get(url : string) {
         return axios.get(url, getCustomHeaderAuth());
    };

    post(url : string, data : any) {
        return axios.post(url, data, getCustomHeaderAuth())
    };

    put(url : string, data : any) {
        return axios.put(url, data, getCustomHeaderAuth())
    };

    patch(url : string, data : any) {
        return axios.patch(url, data, getCustomHeaderAuth())
    };

    delete(url : string) {
        return axios.delete(url, getCustomHeaderAuth());
    };
};

export default new RequestService();