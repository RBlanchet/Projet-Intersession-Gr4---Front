import React from "react"
import UsersForm from "./usersForm"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import usersSchema from "../schemas/users"
import jobSchema from "../schemas/jobs"


class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false
        }
    }

    componentDidMount() {
        apiHelpers.apiGet("users").then((response) => {
            this.setState({users: normalize(response.data, usersSchema)})
        })
        apiHelpers.apiGet("jobs").then((response) => {
            this.setState({jobs: normalize(response.data, jobSchema)})
        })
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <UsersHeader/>
                </div>
                <div className="content__inner">
                    <UsersCRUD users={this.state.users} jobs={this.state.jobs}/>
                </div>
            </div>
        )
    }
}


const UsersHeader = () => {
    return (
        <h1 style={{margin: 0}}>Utilisateurs</h1>
    )
}

class UsersCRUD extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        this.setEditing = this.setEditing.bind(this)
    }

    setEditing(id) {
        return () => {
            this.setState({editing: false})
            setTimeout(() => {
                this.setState({editing: id})
            }, 1)
        }
    }

    render() {
        const users = this.props.users
        const jobs = this.props.jobs
        if (users.result && jobs) {
            return (
                <div>
                    <div>
                        {
                            this.state.editing
                                ? <UsersForm
                                    users={users}
                                    jobs={jobs}
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}/>
                                : ""
                        }
                    </div>
                    <div>
                        {users.result.map(userId => (
                            <div key={userId} onClick={this.setEditing(userId)}>
                                {users.entities.users[userId].email} |
                                {" "}
                                {users.entities.jobs[users.entities.users[userId].job].name}
                            </div>
                        ))}
                    </div>
                    <button onClick={this.setEditing("new")}>Créer un utilisateur</button>
                </div>
            )
        } else {
            return "Chargement... "
        }
    }


}

export default Users