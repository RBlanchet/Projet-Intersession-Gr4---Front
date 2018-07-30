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
        }

        this.setEditing = this.setEditing.bind(this)
        this.reloadProjects = this.reloadProjects.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet("users/7/projects").then((response) => {
            this.setState({projects: normalize(response.data, projectSchema)})
        })
        apiHelpers.apiGet("users").then((response) => {
            this.setState({users: normalize(response.data, usersSchema)})
        })
    }

    reloadProjects() {
        apiHelpers.apiGet("projects").then((response) => {
            this.setState({projects: normalize(response.data, projectSchema)})
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
        return (
            <div className={"content"}>
                <div className="content__header">
                    <ProjectsHeader setEditing={this.setEditing}/>
                </div>
                <div className="content__inner">
                    <ProjectsCRUD
                        projects={this.state.projects}
                        users={this.state.users}
                        reloadProjects={this.reloadProjects}
                        setEditing={this.setEditing}
                        editing={this.state.editing}
                    />
                </div>
            </div>
        )
    }
}


const ProjectsHeader = props => {
    return (
        <div>
            <h1 style={{margin: 0}}>Projets</h1>
            <button onClick={props.setEditing("new")}>Créer un projet</button>
        </div>
    )
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
                                return {
                                    onClick: (e) => {
                                        console.log(cellInfo)
                                        if (rowInfo && ["editUsers"].indexOf(cellInfo.id) === -1) {
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

export default Projects