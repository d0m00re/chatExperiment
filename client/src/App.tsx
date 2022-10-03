import './App.css';
import PageRoomList from './components/pages/RoomList';
import * as AuthPage from './components/pages/Auth';
import {useState, useEffect, useContext} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import APIAuth from './components/pages/Auth/Network/Auth.network';

import * as MeProvider from './components/provider/meListProvider';
import {E_ACTION_ME} from './components/provider/meListProvider/meReducer';

import {MeContext} from './components/provider/meListProvider/meProvider';

import useEffectOnce from './components/hooks/useEffectOnce';

import "./index.css";

const routerAuth = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage.Navbar />,
    children: [
      {
        path: 'login',
        element: <AuthPage.Login />
      },
      {
        path: "register",
        element: <AuthPage.Register />,
      },
      {
        path: "forgotPassword",
        element: <AuthPage.RecoverPassword />,
      }
    ]
  }
]);

function App() {
  return (
    <div className="App flexRow">
      <MeProvider.MeProvider>
        <SubApp />
      </MeProvider.MeProvider>
    </div>
  )
}

function SubApp() {
  const {
    user_id,
    email,
    dispatch,
  } = useContext(MeContext)
  useEffectOnce(() => {
    // getME
    APIAuth.me()
    .then(resp => {
      console.log("Success");
      let userInfo = resp.data;
      console.log(resp.data);
      dispatch({type : E_ACTION_ME.SET_USER, payload : {user_id : userInfo.user_id, email : userInfo.email}});
    })
    .catch(err => {
      console.log("Error");
      console.log(err);
    })
  });

  return <>
    {(!(user_id?.length)) ?
      <RouterProvider router={routerAuth} /> :
      <>
      <p style={{color : 'red'}}>{user_id} {email}</p>
      <PageRoomList />
      </>
    }
    </>

}

export default App
