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
                    {/*<li>*/}
                        {/*<Link to="/">Connexion</Link>*/}
                    {/*</li>*/}
                    <li>
                        <Link to="/dashboard">Tableau de bord</Link>
                    </li>
                    <li>
                        <Link to="/users">Gestion des utilisateurs</Link>
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