import React from "react"
import {Link} from "react-router-dom"
import connectionHelpers from "../connectionHelpers"

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
                        <button onClick={connectionHelpers.logoutUser()}>Se déconnecter</button>
                    </li>
                </ul>
            )
        } else {
            return ""
        }
    }
}

export default Nav