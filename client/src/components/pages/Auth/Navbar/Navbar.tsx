import React, { ReactElement } from 'react'
import { Outlet, Link } from "react-router-dom";
interface Props {

}

function Navbar({ }: Props): ReactElement {
    return (
        <>
            <div id="sidebar">
                {/* other elements */}

                <nav>
                    <ul>
                        <li>
                            <Link to={`login`}>Login</Link>
                        </li>
                        <li>
                            <Link to={`register`}>Register</Link>
                        </li>
                        <li>
                            <Link to={`forgotPassword`}>Forgot Password</Link>
                        </li>
                    </ul>
                </nav>

                {/* other elements */}
                <div id="detail">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Navbar
