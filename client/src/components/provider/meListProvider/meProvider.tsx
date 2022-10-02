import { useState, useContext, createContext, useReducer } from 'react'

import { meReducer, makeMe, IStateWtDispatch } from './meReducer';

export const MeContext = createContext<IStateWtDispatch>({
    user_id : null,
    email : null
});

function MeProvider(props : any) {
  const [roomList, dispatch] = useReducer(meReducer, makeMe());
    
    return (
        <MeContext.Provider value={{...roomList, dispatch }}>
            {props.children}
        </MeContext.Provider>
    )
}

export default MeProvider;