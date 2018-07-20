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
                <div className={"nav"}>
                    {/*<Link to="/">Connexion</Link>*/}
                    <Link className={"nav__item"} to="/dashboard">
                        <span className={"nav__item-text"}>Tableau de bord</span>
                    </Link>
                    <Link className={"nav__item"}  to="/users">
                        <span className={"nav__item-text"}>Gestion des utilisateurs</span>
                    </Link>
                    <button className={"nav__item"}  onClick={logout}>
                        <i className="fas fa-times-circle"/>
                        <span className={"nav__item-text"}>Se déconnecter</span>
                    </button>
                </div>
            )
        } else {
            return ""
        }
    }
}

export default Nav