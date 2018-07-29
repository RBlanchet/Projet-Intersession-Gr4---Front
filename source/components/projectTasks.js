import React from "react"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import TasksForm from "./tasksForm"
import ReactTable from "react-table"
import taskSchema from "../schemas/tasks"

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
            this.setState({tasks: normalize(response.data, taskSchema)})
        })
    }

    reloadTasks() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({users: normalize(response.data, taskSchema)})
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
        <div>
            <h1 style={{margin: 0}}>Tâches du projet {props.projectId}</h1>
            <button onClick={props.setEditing("new")}>Créer un utilisateur</button>
        </div>
    )
}

class TasksCRUD extends React.Component {

    columns = [{
        id: "name",
        Header: 'Intitulé',
        accessor: id => this.props.tasks.entities.tasks[id].name,
    }]

    render() {
        const tasks = this.props.tasks
        // const jobs = this.props.jobs
        if (tasks) {
            return (
                <div>
                    <div>
                        {this.props.editing
                            ? <TasksForm
                                tasks={tasks}
                                // jobs={jobs}
                                editing={this.props.editing}
                                setEditing={this.props.setEditing}/>
                            : ""
                        }
                    </div>
                    <div>
                        <ReactTable
                            data={tasks.result}
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

export default Tasks