import User from './../../../Model/user.model';

interface IUserFindOneWithEmail {
    email : string;
}

const userFindOneWithEmail =  (props : IUserFindOneWithEmail) => {
    return User.findOne({email : props.email});
}

export {
    userFindOneWithEmail
};