import React from "react"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import projectSchema from "../schemas/projects"
import ProjectsForm from "./projectsForm"
import usersSchema from "../schemas/users"
import ReactTable from "react-table"
import {Link} from "react-router-dom"


class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: false,
            editing: false,
            user: false,
        }

        this.setEditing = this.setEditing.bind(this)
        this.reloadProjects = this.reloadProjects.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet("me").then((response) => {
            this.setState({user: response.data})
            apiHelpers.apiGet("users/" + response.data.id + "/projects").then((response) => {
                this.setState({projects: normalize(response.data, projectSchema)})
            })
        })
    }

    reloadProjects() {
        apiHelpers.apiGet("me").then((response) => {
            this.setState({user: response.data})
            apiHelpers.apiGet("users/" + response.data.id + "/projects").then((response) => {
                this.setState({projects: normalize(response.data, projectSchema)})
            })
        })
    }

    setEditing(id) {
        return (e) => {
            this.setState({editing: false})
            setTimeout(() => {
                this.setState({editing: id})
            }, 1)
            if (!id) {
                this.reloadProjects()
            }
            if (e) {
                e.stopPropagation()
            }
        }
    }

    render() {
        if (this.state.user) {
            return (
                <div className={"content"}>
                    <div className="content__header">
                        <ProjectsHeader setEditing={this.setEditing} userJob={this.state.user.job.id}/>
                    </div>
                    <div className="content__inner">
                        <ProjectsCRUD
                            projects={this.state.projects}
                            users={this.state.users}
                            reloadProjects={this.reloadProjects}
                            setEditing={this.setEditing}
                            editing={this.state.editing}
                            userJob={this.state.user.job.id}
                        />
                    </div>
                </div>
            )
        } else {
            return 'Chargement ...'
        }

    }
}


const ProjectsHeader = props => {
    if (props.userJob === 1 || props.userJob === 2) {
        return (
            <div>
                <h1 style={{margin: 0}}>Mes projets</h1>
                <button onClick={props.setEditing("new")}>Créer un projet</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{margin: 0}}>Mes projets</h1>
            </div>
        )
    }
}

class ProjectsCRUD extends React.Component {

    columns = [{
        id: "name",
        Header: 'Nom',
        accessor: id => this.props.projects.entities.projects[id].name
    }, {
        id: "date_start",
        Header: 'Date de début',
        accessor: id => this.props.projects.entities.projects[id].date_start.substr(0, 10) + ' ' + this.props.projects.entities.projects[id].date_start.substr(11, 5) + ':00'
    }, {
        id: "date_end",
        Header: 'Date de fin',
        accessor: id => this.props.projects.entities.projects[id].date_end.substr(0, 10) + ' ' + this.props.projects.entities.projects[id].date_end.substr(11, 5) + ':00'
    }, {
        id: "editUsers",
        Header: 'Utilisateurs',
        accessor: id => <Link to={`/projects/${id}/users`}>
            <i className="fas fa-users nav__item-icon"/>
            <span className={"nav__item-text"}>Gestion des utilisateurs</span>
        </Link>
    }, {
        id: "editTasks",
        Header: 'Tâches',
        accessor: id => <Link to={`/projects/${id}/tasks`}>
            <i className="fas fa-users nav__item-icon"/>
            <span className={"nav__item-text"}>Gestion des tâches</span>
        </Link>
    }]

    render() {
        const projects = this.props.projects
        const userJob  = this.props.userJob
        if (projects.result) {
            return (
                <div>
                    <div>
                        {
                            this.props.editing
                                ? <ProjectsForm
                                    projects={projects}
                                    users={this.props.users}
                                    editing={this.props.editing}
                                    setEditing={this.props.setEditing}/>
                                : ""
                        }
                    </div>
                    <div>
                        <ReactTable
                            data={projects.result}
                            columns={this.columns}
                            showPageSizeOptions={false}
                            defaultPageSize={10}
                            previousText={'Précedent'}
                            nextText={'Suivant'}
                            loadingText={'Chargement'}
                            noDataText='Aucun projet trouvé'
                            pageText='Page'
                            ofText='sur'
                            rowsText='lignes'
                            defaultSorted={[{
                                id: 'name'
                            }]}

                            getTdProps={(state, rowInfo, cellInfo) => {
                                if (userJob === 1 || userJob === 2) {return {
                                    onClick: (e) => {
                                        if (rowInfo && ["editUsers"].indexOf(cellInfo.id) === -1) {
                                                this.props.setEditing(rowInfo.original)(e)
                                            }
                                        }
                                    }
                                } else {
                                    return false
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

export default Projects