import React from "react"
import UsersForm from "./usersForm"
import {normalize} from 'normalizr'
import ReactTable from 'react-table'
import apiHelpers from "../helpers/apiHelpers"
import usersSchema from "../schemas/users"
import jobSchema from "../schemas/jobs"
import connectionHelpers from "../helpers/connectionHelpers"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"


class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false,
            editing: false,
        }
        console.log(connectionHelpers.isAuthenticated())
        this.setEditing = this.setEditing.bind(this)
        this.reloadUsers = this.reloadUsers.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet("users").then((response) => {
            this.setState({users: normalize(response.data, [usersSchema])})
        })
        apiHelpers.apiGet("jobs").then((response) => {
            this.setState({jobs: normalize(response.data, jobSchema)})
        })
    }

    reloadUsers() {
        apiHelpers.apiGet("users").then((response) => {
            this.setState({users: normalize(response.data, [usersSchema])})
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
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName="slide">
                <div className={"content"}>
                    <div className="content__header">
                        <UsersHeader setEditing={this.setEditing}/>
                    </div>
                    <UsersCRUD
                        users={this.state.users}
                        jobs={this.state.jobs}
                        reloadUsers={this.reloadUsers}
                        setEditing={this.setEditing}
                        editing={this.state.editing}
                    />
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}


const UsersHeader = props => {
    return (
        <div className="content__header--space">
            <h1 className="content__header--title" style={{margin: 0}}>Utilisateurs</h1>
            <button className="content__header--button" onClick={props.setEditing("new")}><i className="fas fa-plus"></i></button>
        </div>
    )
}

const Loading = props => {
    return (
        <div className="loader">
            <svg className="loader__circular">
                <circle className="loader__circular--path" cx="50" cy="50" r="15" fill="none"
                        strokeWidth="2" strokeMiterlimit="10">
                </circle>
            </svg>
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
                <div className="react-table">
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
                        <div className="row">
                            <div className="row__col-100">
                                <div className="card card__lg">
                                    <div className="content__inner">
                                        <ReactTable
                                            data={users.result}
                                            columns={this.columns}
                                            showPageSizeOptions={false}
                                            defaultPageSize={16}
                                            previousText={<i className="fas fa-chevron-left"></i>}
                                            nextText={<i className="fas fa-chevron-right"></i>}
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
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="react-table">
                    <div>
                        <div className="row">
                            <div className="row__col-100">
                                <div className="card card__lg">
                                    <div className="content__inner">
                                        <Loading/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


}

export default Users