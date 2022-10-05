import jwt from "jsonwebtoken";

interface IUserInfo {
    email : string,
    user_id : string
}

// gard
const encodeToken = (tokenDecoded : any) : IUserInfo | undefined => {
    let email = tokenDecoded?.email;
    let user_id = tokenDecoded?.user_id;
    
    if (email && user_id &&
        typeof(email) === 'string' && typeof(user_id) === 'string')
        return {email, user_id};
    console.error("Invalid encoding user token")
    return undefined;
}

const decodeToken = (token : string) : IUserInfo | undefined => {
    const config = process.env;

    const decodedToken = encodeToken(jwt.verify(token, config.TOKEN_KEY ?? 'oupsi'));
    return (decodedToken);
}

export default decodeToken;