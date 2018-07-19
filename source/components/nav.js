import React from "react"
import {Link} from "react-router-dom"
import connectionHelpers from "../connectionHelpers"

function logout() {
    connectionHelpers.logoutUser()
    let url = window.location.toString()
    url = url.split("#")[0]
    window.location = url
}

class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (connectionHelpers.isAuthenticated()) {

            return (
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <button onClick={logout}>Se déconnecter</button>
                    </li>
                </ul>
            )
        } else {
            return ""
        }
    }
}

export default Nav