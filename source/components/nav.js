import React from "react"
import {Link} from "react-router-dom"
import connectionHelpers from "../helpers/connectionHelpers"

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
                        <i className="fas fa-tachometer-alt nav__item-icon"/>
                        <span className={"nav__item-text"}>Tableau de bord</span>
                    </Link>
                    <Link className={"nav__item"} to="/users">
                        <i className="fas fa-users nav__item-icon"/>
                        <span className={"nav__item-text"}>Gestion des utilisateurs</span>
                    </Link>
                    <Link className={"nav__item"} to="/projects">
                        <i className="fas fa-users nav__item-icon"/>
                        <span className={"nav__item-text"}>Gestion des projets</span>
                    </Link>
                    <button className={"nav__item nav__item--last"} onClick={logout}>
                        <i className="fas fa-times-circle fa-lg nav__item-icon"/>
                        <span className={"nav__item-text"}>Se déconnecter</span>
                    </button>
                </div>
            )
        } else {
            return (<div className={"nav"}/>)
        }
    }
}

export default Nav