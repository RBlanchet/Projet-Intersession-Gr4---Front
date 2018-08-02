import React from "react"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import projectSchema from "../schemas/projects"
import ProjectsForm from "./projectsForm"
import usersSchema from "../schemas/users"
import ReactTable from "react-table"
import {Link} from "react-router-dom"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"


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
                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName="slide">
                    <div className={"content"}>
                        <div className="content__header">
                            <ProjectsHeader setEditing={this.setEditing}
                                        userJob={this.state.user.job.id}/>
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
                </ReactCSSTransitionGroup>
            )
        } else {
            return (
                <Loading/>
            )
        }

    }
}


const ProjectsHeader = props => {
    if (props.userJob === 1 || props.userJob === 2) {
        return (
            <div className="content__header--space">
                <h1 className="content__header--title" style={{margin: 0}}>Mes projets</h1>
                <button className="content__header--button" onClick={props.setEditing("new")}>
                    <i className="fas fa-plus"/>
                </button>
            </div>
        )
    } else {
        return (
            <div className="content__header--space">
                <h1 className="content__header--title" style={{margin: 0}}>Mes projets</h1>
            </div>
        )
    }
}

const Loading = props => {
    return (
        <div className="loader">
            <svg className="loader__circular">
                <circle className="loader__circular--path" cx="50" cy="50" r="15" fill="none"
                        strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
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
        accessor: id => `${this.props.projects.entities.projects[id].date_start.substr(0, 10)}`
        // ${this.props.projects.entities.projects[id].date_start.substr(11, 5)}:00
    }, {
        id: "date_end",
        Header: 'Date de fin',
        accessor: id => `${this.props.projects.entities.projects[id].date_end.substr(0, 10)}`
        // ${this.props.projects.entities.projects[id].date_end.substr(11, 5)}:00
    }, {
        id: "price",
        Header: 'Prix',
        accessor: id => `${this.props.projects.entities.projects[id].price} €`
    }, {
        id: "editUsers",
        Header: 'Utilisateurs',
        accessor: id =>
            <Link to={`/projects/${id}/users`} className="nav__item-link nav__item-user">
                <i className="fas fa-user-plus nav__item-icon"/>
            </Link>
    }, {
        id: "editTasks",
        Header: 'Tâches',
        accessor: id =>
            <Link to={`/projects/${id}/tasks`} className="nav__item-link nav__item-task">
                <i className="fas fa-users nav__item-icon"/>
            </Link>
    },{
        id: "gantt",
        Header: 'Gantt',
        accessor: id => <Link to={`/projects/${id}/gantt`} className="nav__item-link nav__item-gantt">
            <i className="fas fa-users nav_item-icon"/>
        </Link>
}]

    render() {
        const projects = this.props.projects
        const userJob = this.props.userJob
        if (projects.result) {
            return (
                <div className="react-table">
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
                        <div className="row">
                            <div className="row__col-100">
                                <div className="card card__lg">
                                    <div className="content__inner">
                                        <ReactTable
                                            data={projects.result}
                                            columns={this.columns}
                                            showPageSizeOptions={false}
                                            defaultPageSize={16}
                                            previousText={<i className="fas fa-chevron-left"/>}
                                            nextText={<i className="fas fa-chevron-right"/>}
                                            loadingText={'Chargement'}
                                            noDataText='Aucun projet trouvé'
                                            pageText='Page'
                                            ofText='sur'
                                            rowsText='lignes'
                                            defaultSorted={[{
                                                id: 'name'
                                            }]}

                                            getTdProps={(state, rowInfo, cellInfo) => {
                                                if (userJob === 1 || userJob === 2) {
                                                    return {
                                                        onClick: (e) => {
                                                            if (rowInfo && ["editUsers"].indexOf(cellInfo.id) === -1) {
                                                                this.props.setEditing(rowInfo.original)(e)
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    return false
                                                }
                                            }}/>
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

export default Projects