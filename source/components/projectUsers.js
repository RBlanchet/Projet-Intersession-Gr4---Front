import React from "react"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import RolesForm from "./rolesForm"
import ReactTable from "react-table"
import {role, user, job} from "../schemas/schemas"
import {Link} from "react-router-dom"

class Roles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: false,
            editing: false,
        }

        this.setEditing = this.setEditing.bind(this)
        this.reloadRoles = this.reloadRoles.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/roles`).then((response) => {
            this.setState({roles: normalize(response.data, [role])})
        })
        apiHelpers.apiGet(`users`).then((response) => {
            this.setState({users: normalize(response.data, [user])})
        })
        apiHelpers.apiGet(`jobs`).then((response) => {
            this.setState({jobs: normalize(response.data, [job])})
        })
    }

    reloadRoles() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/roles`).then((response) => {
            this.setState({roles: normalize(response.data, [role])})
        })
    }

    setEditing(id) {
        return (e) => {
            this.setState({editing: false})
            setTimeout(() => {
                this.setState({editing: id})
            }, 1)
            if (!id) {
                this.reloadRoles()
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
                    <RolesHeader setEditing={this.setEditing} projectId={this.props.match.params.id}/>
                </div>
                <div className="content__inner">
                    <RolesCRUD
                        roles={this.state.roles}
                        jobs={this.state.jobs}
                        users={this.state.users}
                        reloadRoles={this.reloadRoles}
                        setEditing={this.setEditing}
                        editing={this.state.editing}
                        projectId={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}

const RolesHeader = props => {
    return (
        <div className="content__header--space">
            <h1 className="content__header--title" style={{margin: 0}}>Participants au projet id: {props.projectId}</h1>
            <div className="content__header--buttons">
                <Link to={"/projects"} className="content__header--button">
                    <i className="fas fa-arrow-left"/>
                </Link>
                <button className="content__header--button" onClick={props.setEditing("new")}>
                    <i className="fas fa-plus"/>
                </button>
            </div>
        </div>
    )
}

class RolesCRUD extends React.Component {

    columns = [{
        id: "name",
        Header: 'Nom',
        accessor: id => {
            const user = this.props.roles.entities.users[this.props.roles.entities.roles[id].user]
            return `${user.firstname} ${user.lastname}`
        },
    }, {
        id: "job",
        Header: 'Rôle',
        accessor: id => {
            const job = this.props.jobs.entities.jobs[this.props.roles.entities.roles[id].job]
            return `${job.name}`
        },
    }, {
        id: "cost",
        Header: 'Coût horaire (en €)',
        accessor: id => {
            return `${this.props.roles.entities.roles[id].cost} €/h`
        },
    }]

    render() {
        const roles = this.props.roles
        const jobs = this.props.jobs
        const users = this.props.users
        if (roles && jobs) {
            return (
                <div>
                    <div>
                        {this.props.editing && this.props.users
                            ? <RolesForm
                                roles={roles}
                                jobs={jobs}
                                editing={this.props.editing}
                                setEditing={this.props.setEditing}
                                projectId={this.props.projectId}
                                users={users}/>
                            : ""
                        }
                    </div>
                    <div>
                        <div className="row">
                            <div className="row__col-100">
                                <div className="card card__lg">
                                    <div className="content__inner">
                                        <ReactTable
                                            data={roles.result}
                                            columns={this.columns}
                                            showPageSizeOptions={false}
                                            defaultPageSize={16}
                                            previousText={<i className="fas fa-chevron-left"/>}
                                            nextText={<i className="fas fa-chevron-right"/>}
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
            return "Chargement... "
        }
    }


}

export default Roles