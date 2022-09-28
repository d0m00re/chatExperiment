import React, { ReactElement, useState } from 'react'
import Paper from '../../../atoms/Paper';

interface Props {
    
}

interface IRegisterState {
    email : string;
    password : string;
    confirmPassword : string;
}

const makeRegisterEmpty = () => {
    return {
        email : '',
        password : '',
        confirmPassword : ''
    }
}

function Register(): ReactElement {
    const [registerInfo, setRegisterInfo] = useState<IRegisterState>(makeRegisterEmpty);
    
    return (
        <Paper>
            <form className="flexColumn">
                <label>Email : </label>
                <input type="email" name="email" />
                <label>Password : </label>
                <input type="password" name="password" />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" />
                <button>register</button>
            </form>
        </Paper>
    )
}

export default Register
