export interface IUser {
    user_id : string | null;
    email : string | null;
}

type TActionType =  'RESET_USER' |
                    'SET_USER' |
                    'SET_EMAIL' |
                    'SET_USER_ID';

export enum E_ACTION_ME {
    RESET_USER = "RESET_USER",
    SET_USER = "SET_USER",
    SET_EMAIL = "SET_EMAIL",
    SET_USER_ID = "SET_USER_ID",
}

// action

export interface IResetUser {};
export interface ISetUser extends IUser {};
export interface ISetEmail {email : string};
export interface ISetUserId {user_id : string};

export type IActionReducer =
    {type : E_ACTION_ME.RESET_USER, payload : null}
    | {type : E_ACTION_ME.SET_USER, payload : ISetUser}
    | {type : E_ACTION_ME.SET_EMAIL, payload : ISetEmail}
    | {type : E_ACTION_ME.SET_USER_ID, payload : ISetUserId};

    //ADD_MSG_LIST_TO_ROOM
export const recordActionRoomList: Record<TActionType, string> = E_ACTION_ME;

export interface IStateWtDispatch extends IUser{
    dispatch ?: React.Dispatch<IActionReducer>;
}

export const makeMe = () : IUser => ({
    user_id : null,
    email : null

});

export const meReducer = (state : IUser, action : IActionReducer) : IUser => {
    console.log("=== ACTION ===")
    console.log(action)
    switch (action.type) {
        case E_ACTION_ME.RESET_USER: {
            console.log("* reducer RESET_USER");
            return makeMe();
        }

        case E_ACTION_ME.SET_USER: {
            console.log("* reducer : SET_USER")
            return {
                ...state,
                user_id : action.payload.user_id,
                email : action.payload.email
            }
        }
        case E_ACTION_ME.SET_EMAIL: {
            console.log("* reducer : SET_EMAIL")
            return {
                ...state,
                email : action.payload.email
            }
        }

        case E_ACTION_ME.SET_USER_ID: {
            console.log("* reducer : SET_ROOM_LIST : ")

            return {
                ...state,
                user_id : action.payload.user_id,
            }
        }

        default:
            return state;
    }
}  