import React from "react"
import UsersForm from "./usersForm"
import {normalize} from 'normalizr'
import ReactTable from 'react-table'
import apiHelpers from "../helpers/apiHelpers"
import usersSchema from "../schemas/users"
import jobSchema from "../schemas/jobs"


class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false,
            editing: false,
        }

        this.setEditing = this.setEditing.bind(this)
        this.reloadUsers = this.reloadUsers.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet("users").then((response) => {
            this.setState({users: normalize(response.data, usersSchema)})
        })
        apiHelpers.apiGet("jobs").then((response) => {
            this.setState({jobs: normalize(response.data, jobSchema)})
        })
    }

    reloadUsers() {
        apiHelpers.apiGet("users").then((response) => {
            this.setState({users: normalize(response.data, usersSchema)})
        })
    }

    setEditing(id) {
        return (e) => {
            this.setState({editing: false})
            setTimeout(() => {
                this.setState({editing: id})
            }, 1)
            if (!id) {
                this.reloadUsers()
            }
            if (e) {
                e.stopPropagation()
            }
        }
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <UsersHeader setEditing={this.setEditing}/>
                </div>
                <div className="content__inner">
                    <UsersCRUD
                        users={this.state.users}
                        jobs={this.state.jobs}
                        reloadUsers={this.reloadUsers}
                        setEditing={this.setEditing}
                        editing={this.state.editing}/>
                </div>
            </div>
        )
    }
}


const UsersHeader = props => {
    return (
        <div>
            <h1 style={{margin: 0}}>Utilisateurs</h1>
            <button onClick={props.setEditing("new")}>Créer un utilisateur</button>
        </div>
    )
}

class UsersCRUD extends React.Component {

    columns = [{
        id: "email",
        Header: 'Email',
        accessor: id => this.props.users.entities.users[id].email,
    }, {
        id: "lastname",
        Header: 'Nom',
        accessor: id => this.props.users.entities.users[id].lastname,
    }, {
        id: "firstname",
        Header: 'Prénom',
        accessor: id => this.props.users.entities.users[id].firstname
    }, {
        id: "job",
        Header: 'Rôle',
        accessor: id => this.props.users.entities.jobs[this.props.users.entities.users[id].job].name,
    }]

    render() {
        const users = this.props.users
        const jobs = this.props.jobs
        if (users.result && jobs) {
            return (
                <div>
                    <div>
                        {this.props.editing
                            ? <UsersForm
                                users={users}
                                jobs={jobs}
                                editing={this.props.editing}
                                setEditing={this.props.setEditing}/>
                            : ""
                        }
                    </div>
                    <div>
                        <ReactTable
                            data={users.result}
                            columns={this.columns}
                            showPageSizeOptions={false}
                            defaultPageSize={10}
                            previousText={'Précedent'}
                            nextText={'Suivant'}
                            loadingText={'Chargement'}
                            noDataText='Aucun utilisateur trouvé'
                            pageText='Page'
                            ofText='sur'
                            rowsText='lignes'
                            defaultSorted={[{
                                id: 'lastname'
                            }]}

                            getTdProps={(state, rowInfo) => {
                                return {
                                    onClick: (e) => {
                                        if (rowInfo) {
                                            this.props.setEditing(rowInfo.original)(e)
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )
        } else {
            return "Chargement... "
        }
    }


}

export default Users