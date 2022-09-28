import React, { ReactElement, useState } from 'react';
import Paper from '../../../atoms/Paper';

interface Props {
    
}

interface IRecoverPasswordInfo {
    email : string;
}

function RecoverPassword({}: Props): ReactElement {
    const [recoverPasswordInfo, setRecoverPasswordInfo] = useState<IRecoverPasswordInfo>({email : ""});
    
    return (
        <Paper>
        <form className="flexColumn">
            <label>Email :</label>
            <input type="email" name="email" />
            <button>reset password</button>
        </form>
        </Paper>
    )
}

export default RecoverPassword
