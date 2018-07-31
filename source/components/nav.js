import React from "react"
import {Link} from "react-router-dom"
import connectionHelpers from "../helpers/connectionHelpers"
import apiHelpers from "../helpers/apiHelpers"

function logout() {
    connectionHelpers.logoutUser()
    let url = window.location.toString()
    url = url.split("#")[0]
    window.location = url
}

class Nav extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            job: false,
        }
    }

    componentDidMount() {
        apiHelpers.apiGet("me").then((response) => {
            this.setState({job: response.data.job.id})
        })
    }

    render() {
        const userJob = this.state.job
        if (connectionHelpers.isAuthenticated()) {
            if (this.state.job) {
                if (userJob === 1 || userJob === 2) {
                    return (
                        <div className={"nav"}>
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
                                <span className={"nav__item-text"}>Gestion de mes projets</span>
                            </Link>
                            <Link className={"nav__item"} to="/tasks">
                                <i className="fas fa-users nav__item-icon"/>
                                <span className={"nav__item-text"}>Gestion des taches</span>
                            </Link>
                            <button className={"nav__item nav__item--last"} onClick={logout}>
                                <i className="fas fa-times-circle fa-lg nav__item-icon"/>
                                <span className={"nav__item-text"}>Se déconnecter</span>
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <div className={"nav"}>
                            {/*<Link to="/">Connexion</Link>*/}
                            <Link className={"nav__item"} to="/dashboard">
                                <i className="fas fa-tachometer-alt nav__item-icon"/>
                                <span className={"nav__item-text"}>Tableau de bord</span>
                            </Link>
                            <Link className={"nav__item"} to="/projects">
                                <i className="fas fa-users nav__item-icon"/>
                                <span className={"nav__item-text"}>Gestion de mes projets</span>
                            </Link>
                            <Link className={"nav__item"} to="/tasks">
                                <i className="fas fa-users nav__item-icon"/>
                                <span className={"nav__item-text"}>Gestion des taches</span>
                            </Link>
                            <button className={"nav__item nav__item--last"} onClick={logout}>
                                <i className="fas fa-times-circle fa-lg nav__item-icon"/>
                                <span className={"nav__item-text"}>Se déconnecter</span>
                            </button>
                        </div>
                    )
                }
            } else {
                return (
                    <div className={"nav"}>
                        <div>Chargement ...</div>
                    </div>
                )
            }

        } else {
            return ('')
        }
    }
}
export default Nav