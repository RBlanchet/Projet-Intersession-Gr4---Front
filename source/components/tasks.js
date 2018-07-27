import React from "react"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import taskSchema from "../schemas/tasks"
import TaskForm from "./tasksForm"


class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: false
        }
    }

    componentDidMount() {
        apiHelpers.apiGet("tasks").then((response) => {
            this.setState({tasks: normalize(response.data, taskSchema)})
        })
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <TasksHeader tasks={this.state.tasks} editing={this.state.editing}/>
                </div>
                <div className="content__inner">
                    <TasksCRUD tasks={this.state.tasks}/>
                </div>
            </div>
        )
    }
}

const TasksHeader = () => {
    return (
        <h1 style={{margin: 0}}>Tasks</h1>
    )
}

class TasksCRUD extends React.Component {
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
        const tasks = this.props.tasks
        if (tasks.result) {
            return (
                <div>
                    <div>
                        {
                            this.state.editing
                                ? <TaskForm
                                    tasks={tasks}
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}/>
                                : ""
                        }
                    </div>
                    <div>
                        {tasks.result.map(taskId => (
                            <div key={taskId} onClick={this.setEditing(taskId)}>
                                {tasks.entities.tasks[taskId].name}
                            </div>
                        ))}
                    </div>
                    <button onClick={this.setEditing("new")}>Créer une tache</button>
                </div>
            )
        } else {
            return "Chargement... "
        }
    }
}

export default Tasks