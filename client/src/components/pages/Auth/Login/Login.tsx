import axios from 'axios';
import React, { ReactElement, useState } from 'react'
import Paper from '../../../atoms/Paper';
import AuthNetwork from "./../../../../NetworkAdapter/Auth.network";

interface ILoginState {
    email : string;
    password : string;
}

function Login(): ReactElement {
    const [loginInfo, setLoginInfo] = useState<ILoginState>({email : '', password : ''});

    const getMe = () => {
        AuthNetwork.me()
        .then(e => console.log("success")) 
        .catch(err => console.log("error"))   
    }

    const tryLoggin = (e) => {
        e.preventDefault();
        console.log("try to loggin go go go ")
        AuthNetwork.login(loginInfo)
        .then((resp : any) => {
            console.log("Resp good")
          //  alert('good');
          //alert(resp.data.token)
          localStorage.setItem('token', resp?.data?.token);
          console.log(resp)
        })
        .catch(err => {
            console.log("Resp error")
        //    alert("bad")
        })
    }

    return (
        <Paper>
            <form onSubmit={tryLoggin} className="flexColumn">
                <label>Email : </label>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => setLoginInfo(old => ({
                        ...old, email : e.target.value
                    }))}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setLoginInfo(old => ({
                        ...old, password : e.target.value
                    }))}    
                /> 
                <button>login</button>
            </form>
            <button onClick={getMe}>get me</button>
        </Paper>
    )
}

export default Login
