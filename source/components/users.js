import React from "react"
import users from "../fake-data/fake_users"
import UsersForm from "./usersForm"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import usersSchema from "../schemas/users"


class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false
        }
    }

    componentDidMount() {
        apiHelpers.apiGet("users").then((response) => {
            console.log(normalize(response.data, usersSchema))
            this.setState({users: normalize(response.data, usersSchema)})
        })
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <UsersHeader users={this.state.users} editing={this.state.editing}/>
                </div>
                <div className="content__inner">
                    <UsersCRUD users={this.state.users}/>
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
        if (users.result) {
            return (
                <div>
                    <div>
                        {
                            this.state.editing
                                ? <UsersForm users={users} editing={this.state.editing} setEditing={this.setEditing}/>
                                : ""
                        }
                    </div>
                    <div>
                        {users.result.map(userId => (
                            <div key={userId} onClick={this.setEditing(userId)}>
                                {users.entities.users[userId].email}
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