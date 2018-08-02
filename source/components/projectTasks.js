import React from "react"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import TasksForm from "./tasksForm"
import ReactTable from "react-table"
import taskSchema from "../schemas/tasks"
import {Link} from "react-router-dom"
import {role, task} from "../schemas/schemas"

class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false,
            editing: false,
        }

        this.setEditing = this.setEditing.bind(this)
        this.reloadTasks = this.reloadTasks.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: normalize(response.data, [task])})
        })
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/roles`).then((response) => {
            this.setState({roles: normalize(response.data, [role])})
        })
    }

    reloadTasks() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: normalize(response.data, [task])})
        })
    }

    setEditing(id) {
        return (e) => {
            this.setState({editing: false})
            setTimeout(() => {
                this.setState({editing: id})
            }, 1)
            if (!id) {
                this.reloadTasks()
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
                    <TasksHeader setEditing={this.setEditing} projectId={this.props.match.params.id}/>
                </div>
                <div className="content__inner">
                    <TasksCRUD
                        tasks={this.state.tasks}
                        // jobs={this.state.jobs}
                        roles={this.state.roles}
                        reloadTasks={this.reloadTasks}
                        setEditing={this.setEditing}
                        editing={this.state.editing}
                        projectId={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}


const TasksHeader = props => {
    return (
        <div className="content__header--space">
            <h1 className="content__header--title" style={{margin: 0}}>Tâches du projet {props.projectId}</h1>
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

class TasksCRUD extends React.Component {

    columns = [{
        id: "name",
        Header: 'Intitulé',
        accessor: id => this.props.tasks.entities.tasks[id].name,
    }, {
        id: "startAt",
        Header: 'Date de début',
        accessor: id => `${this.props.tasks.entities.tasks[id].startAt.substr(0, 10)}`
        // ${this.props.tasks.entities.tasks[id].startAt.substr(11, 5)}:00
    }, {
        id: "endAt",
        Header: 'Date de fin',
        accessor: id => `${this.props.tasks.entities.tasks[id].endAt.substr(0, 10)}`
        // ${this.props.projects.entities.projects[id].endAt.substr(11, 5)}:00
    }]

    render() {
        const tasks = this.props.tasks
        const roles = this.props.roles
        if (tasks && roles) {
            return (
                <div>
                    <div>
                        {this.props.editing
                            ? <TasksForm
                                tasks={tasks}
                                roles={roles}
                                editing={this.props.editing}
                                setEditing={this.props.setEditing}
                                projectId={this.props.projectId}/>
                            : ""
                        }
                    </div>
                    <div>
                        <div className="row">
                            <div className="row__col-100">
                                <div className="card card__lg">
                                    <div className="content__inner">
                                        <ReactTable
                                            data={tasks.result}
                                            columns={this.columns}
                                            showPageSizeOptions={false}
                                            defaultPageSize={16}
                                            previousText={<i className="fas fa-chevron-left"/>}
                                            nextText={<i className="fas fa-chevron-right"/>}
                                            loadingText={'Chargement'}
                                            noDataText='Aucune tâche trouvé'
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

export default Tasks