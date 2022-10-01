import User from './../../../Model/user.model';

interface IUserCreateOne {
    first_name : string;
    last_name : string;
    email : string;
    password : string;
}

const userCreateOne =  (props : IUserCreateOne) => {
    return User.create({
        first_name : props.first_name,
        last_name : props.last_name,
        email: props.email.toLowerCase(), // sanitize: convert email to lowercase
        password: props.password
    });

}

export default userCreateOne;