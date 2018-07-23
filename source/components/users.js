import React from "react"
import users from "../fake-data/fake_users"
import UsersForm from "./usersForm"



class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({users: users})
        }, 1000)
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <UsersHeader users={this.state.users} editing={this.state.editing}/>
                </div>
                <div className="content__inner">
                    {this.state.editing
                        ? <UsersForm users={users} editing={this.state.editing} initialValues={{email:"email"}}/>
                        : ""}
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
            "editing": false
        }
    }

    setEditing(id) {
        return () => {
            this.setState({"editing": id})
        }
    }

    render() {
        if (this.props.users) {
            const users = this.props.users
            return (
                <div>
                    <div>
                        {
                            this.state.editing
                                ? <UsersForm/>
                                : ""
                        }
                    </div>
                    <div>
                        {users.result.users.map(userId => (
                            <div key={userId} onClick={this.setEditing(userId)}>
                                {users.entities.users[userId].username}
                            </div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return "Chargement... "
        }
    }


}

export default Users