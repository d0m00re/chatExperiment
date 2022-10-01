import GenNetworkAdapter from "./GenNetworkAdapter";

const C_URL = `http://localhost:4242/api/auth`;

/*
login : 
*/

interface ILoginInput {
    email : string;
    password : string;
}

interface IRegisterInput {
    email : string;
    password : string;
    confirmPassword : string;
    last_name : string;
    first_name : string;
}

interface IForgotPasswordInput {
    email : string;
}

interface ILoginOutput {
    email : string;
    first_name : string;
    last_name : string;
}

interface ILogoutInput {};
interface IMeInput {
    token : string;
};
class AuthNetwork {
    // login
    login(props : ILoginInput) : Promise<{data : ILoginOutput}> {
        const url = `${C_URL}/login`;
        return GenNetworkAdapter.post(url, props);
    }
    // register
    register(props : IRegisterInput) {
        const url = `${C_URL}/register`;
        return GenNetworkAdapter.post(url, props);
    }
    // logout 
    logout(props : ILogoutInput) {
        const url = `${C_URL}/logout`;
        return GenNetworkAdapter.post(url, props);
    }

    // me
    me(props : IMeInput) {
        const url = `${C_URL}/me`;
        return GenNetworkAdapter.get(url);
    }
}

export default new AuthNetwork();