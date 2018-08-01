import React from "react"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import taskSchema from "../schemas/tasks"
import TaskForm from "./tasksForm"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"


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
                <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName="slide">
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
                </ReactCSSTransitionGroup>
            )
        } else {
            return (
                <Loading/>
            )
        }
    }
}

export default Tasks