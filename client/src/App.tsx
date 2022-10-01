import './App.css';
import PageRoomList from './components/pages/RoomList';
import * as AuthPage from './components/pages/Auth';
import {useState, useEffect} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import APIAuth from './components/pages/Auth/Network/Auth.network';

import "./index.css";

const router = createBrowserRouter([
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
  useEffect(() => {
    console.log("test localstorage : ");
    //localStorage.setItem('test', 'hola ci m pickle')
    // get token
    let token = localStorage.getItem('token');
    APIAuth.me({token})
    .then(resp => {
      console.log("Succes login : ")
      console.log(resp.data)
    })
    .catch(err => {
      console.log("Err : ");
      console.log(err);
    })
  },
  [])
  return (
    <div className="App flexRow">
      <RouterProvider router={router} />
      {/*<PageRoomList /> */}
    </div>
  )
}

export default App
