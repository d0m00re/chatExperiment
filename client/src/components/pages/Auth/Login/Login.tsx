import React, { ReactElement, useState } from 'react'
import Paper from '../../../atoms/Paper';
import AuthNetwork from "./../Network/auth.network";

interface ILoginState {
    email : string;
    password : string;
}

function Login(): ReactElement {
    const [loginInfo, setLoginInfo] = useState<ILoginState>({email : '', password : ''});
    
    const tryLoggin = (e) => {
        e.preventDefault();
        console.log("try to loggin go go go ")
        AuthNetwork.login(loginInfo)
        .then(resp => {
            console.log("Resp good")
            alert('good');
        })
        .catch(err => {
            alert("bad")
        })
    }

    return (
        <Paper>
            <form onClick={tryLoggin} className="flexColumn">
                <label>Email : </label>
                <input type="email" name="email" />
                <label>Password</label>
                <input type="password" name="password" /> 
                <button>login</button>
            </form>
        </Paper>
    )
}

export default Login
