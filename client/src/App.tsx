import './App.css';
import PageRoomList from './components/pages/RoomList';

import * as AuthPage from './components/pages/Auth';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
  return (
    <div className="App flexRow">
      <RouterProvider router={router} />
      {/*<PageRoomList /> */}
    </div>
  )
}

export default App
