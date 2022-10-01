import jwt from 'jsonwebtoken';

interface IJwtSign {
    id : string | any;
    email : string | any;
}

const jwtSign = (props : IJwtSign) => {
    return jwt.sign(
        { user_id: props.id, props.email },
        process.env.TOKEN_KEY ?? "wtf",
        {
            expiresIn: "200h",
        }
    );
}

export default jwtSign;