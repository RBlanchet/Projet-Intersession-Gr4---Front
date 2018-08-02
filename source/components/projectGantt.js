import React from "react"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import ReactTable from "react-table"
import ReactDOM from "react-dom"
import {Chart} from "react-google-charts"
import {task} from "../schemas/schemas"
import {project} from "../schemas/schemas"
import {Link} from "react-router-dom"

import Gantt from "./gantt"
import Toolbar from './toolbar'
import MessageArea from './messageArea'
import './App.css'
import projectSchema from "../schemas/projects"
import swal from "sweetalert"


export default class ProjectGantt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentZoom: 'Days',
            messages: [],
            users: false,
            editing: false,
        }
        this.handleZoomChange = this.handleZoomChange.bind(this)
        this.logTaskUpdate = this.logTaskUpdate.bind(this)
        this.logLinkUpdate = this.logLinkUpdate.bind(this)
        this.reloadTasks = this.reloadTasks.bind(this)
    }

    componentDidMount() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: response.data})
            this.setState({tasksNormalized: normalize(response.data, [task])})
        })
        apiHelpers.apiGet(`projects/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({project: response.data})
            })
            .catch((r) => {
                swal({
                    title: "Désolé !",
                    text: "Le projet est desactivé",
                    icon: "warning",
                    button: "Ok!",
                })
                window.location.hash = "#/projects"
            })
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/users`).then((response) => {
            this.setState({users: response.data})
        })
    }

    reloadTasks() {
        this.setState({tasks: false})
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: response.data})
            this.setState({tasksNormalized: normalize(response.data, [task])})
        })
    }

    handleZoomChange(zoom) {
        this.setState({
            currentZoom: zoom
        })
    }

    addMessage(message) {
        var messages = this.state.messages.slice()
        var prevKey = messages.length ? messages[0].key : 0

        messages.unshift({key: prevKey + 1, message})
        if (messages.length > 40) {
            messages.pop()
        }
        this.setState({messages})
    }

    logTaskUpdate(id, mode, task) {
        let text = task && task.text ? ` (${task.text})` : ''
        let message = `Task ${mode}: ${id} ${text}`
        this.addMessage(message)
    }

    logLinkUpdate(id, mode, link) {
        let message = `Link ${mode}: ${id}`
        if (link) {
            message += ` ( source: ${link.source}, target: ${link.target} )`
        }
        this.addMessage(message)
    }

    render() {
        const tasks = this.state.tasks
        const project = this.state.project
        const users = this.state.users
        var data = {data: [], links: []}
        var projectUsers = []
        if (users) {

            users.map((user, i) => {
                projectUsers.push({
                    key: user.id,
                    label: user.firstname + " " + user.lastname
                })
            })
            gantt.serverList("users", projectUsers)
        }
        if (tasks && project) {
            tasks.map(function (task, i) {
                data.data.push({
                    id: task.id,
                    text: task.name,
                    start_date: new Date(task.startAt),
                    end_date: new Date(task.endAt),
                    //duration: task.timeSpend,
                    progress: task.status.percentage / 100,
                    users: task.users,
                    cost: task.cost,
                })
                data.links.push({
                    id: task.parent,
                    source: task.parent,
                    target: task.id,
                    type: '0'
                })
            })
            return (
                <div className={"content"}>
                    <div className="content__header">
                        <GanttHeader setEditing={this.setEditing} project={this.state.project}/>
                    </div>
                    <div className="content__inner">
                        <div className="row">
                            <div className="row__col-100">
                                <div className="card card__lg">
                                    <div className="content__inner">
                                        <Toolbar
                                            zoom={this.state.currentZoom}
                                            onZoomChange={this.handleZoomChange}
                                        />
                                        <div className="gantt-container">
                                            <Gantt
                                                tasks={data}
                                                project={this.state.project}
                                                tasksNormalized={this.state.tasksNormalized}
                                                zoom={this.state.currentZoom}
                                                onTaskUpdated={this.logTaskUpdate}
                                                onLinkUpdated={this.logLinkUpdate} reloadHandle={this.reloadTasks}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={"content"}>
                    <div className="content__header">
                        <Loading/>
                    </div>
                    <div className="content__inner">
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

const GanttHeader = props => {
    console.log(props.project)
    return (
        <div className="w-100">
            <div className="content__header--space">
                <h1 className="content__header--title" style={{margin: 0}}>Participants au
                    projet <i>{props.project.name}</i></h1>
                <div className="row row__header">
                    <div className="row__header--information">
                        Prix : {props.project.price}€
                    </div>
                    <div className="row__header--information">
                        Coût: {props.project.cost}€
                    </div>
                    <div className="row__header--information">
                        Ressources disponible : {props.project.hour_pool}
                    </div>
                    <div className="row__header--information">
                        Ressources consommées : {props.project.hour_spend}
                    </div>
                </div>
                <div className="content__header--buttons">
                    <Link to={"/projects"} className="content__header--button">
                        <i className="fas fa-arrow-left"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
//
// function daysToMilliseconds(days) {
//     return days * 24 * 60 * 60 * 1000
// }
//
// class GanttTasks extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             viewMode: "Day",
//             columns: [
//                 {type: "string", label: "Task ID"},
//                 {type: "string", label: "Task Name"},
//                 {type: "date", label: "Start Date"},
//                 {type: "date", label: "End Date"},
//                 {type: "number", label: "Duration"},
//                 {type: "number", label: "Percent Complete"},
//                 {type: "string", label: "Dependencies"}
//             ],
//             rows: [
//                 [
//                     "Research",
//                     "Find sources",
//                     new Date(2015, 0, 1),
//                     new Date(2015, 0, 5),
//                     null,
//                     100,
//                     null
//                 ],
//                 [
//                     "Write",
//                     "Write paper",
//                     null,
//                     new Date(2015, 0, 9),
//                     daysToMilliseconds(3),
//                     25,
//                     "Research,Outline"
//                 ],
//                 [
//                     "Cite",
//                     "Create bibliography",
//                     null,
//                     new Date(2015, 0, 7),
//                     daysToMilliseconds(1),
//                     20,
//                     "Research"
//                 ],
//                 [
//                     "Complete",
//                     "Hand in paper",
//                     null,
//                     new Date(2015, 0, 10),
//                     daysToMilliseconds(1),
//                     0,
//                     "Cite,Write"
//                 ],
//                 [
//                     "Outline",
//                     "Outline paper",
//                     null,
//                     new Date(2015, 0, 6),
//                     daysToMilliseconds(1),
//                     100,
//                     "Research"
//                 ]
//             ]
//         }
//     }
//
//     render() {
//         return (
//             <div className={"content"}>
//                 <div className="content__header">
//                     <h1 style={{margin: 0}}>Tableau de bord</h1>
//                 </div>
//                 <div className="content__inner">
//                     <Chart
//                         chartType="Gantt"
//                         data={[this.state.columns, ...this.state.rows]}
//                         width="100%"
//                         height="50%"
//                         legendToggle
//                     />
//                 </div>
//             </div>
//         )
//     }
// }
