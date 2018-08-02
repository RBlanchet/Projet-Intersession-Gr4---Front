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
import projectSchema from "../schemas/projects";


export default class ProjectGantt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentZoom: 'Days',
            messages: [],
            users: false,
            editing: false,
        }
        this.handleZoomChange = this.handleZoomChange.bind(this);
        this.logTaskUpdate = this.logTaskUpdate.bind(this);
        this.logLinkUpdate = this.logLinkUpdate.bind(this);
        this.reloadTasks = this.reloadTasks.bind(this);
    }

    componentDidMount() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: response.data})
            this.setState({tasksNormalized: normalize(response.data, [task])})
        })
        apiHelpers.apiGet(`projects/${this.props.match.params.id}`).then((response) => {
            this.setState({project: response.data})
        })
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/users`).then((response) => {
            this.setState({users: response.data})
        })
    }
    reloadTasks(){
        this.setState({tasks: false})
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: response.data})
            this.setState({tasksNormalized: normalize(response.data, [task])})
        })
    }
    handleZoomChange(zoom) {
        this.setState({
            currentZoom: zoom
        });
    }

    addMessage(message) {
        var messages = this.state.messages.slice();
        var prevKey = messages.length ? messages[0].key: 0;

        messages.unshift({key: prevKey + 1, message});
        if(messages.length > 40){
            messages.pop();
        }
        this.setState({messages});
    }

    logTaskUpdate(id, mode, task) {
        let text = task && task.text ? ` (${task.text})`: '';
        let message = `Task ${mode}: ${id} ${text}`;
        this.addMessage(message);
    }

    logLinkUpdate(id, mode, link) {
        let message = `Link ${mode}: ${id}`;
        if (link) {
            message += ` ( source: ${link.source}, target: ${link.target} )`;
        }
        this.addMessage(message)
    }

    render() {
        const tasks = this.state.tasks
        const project = this.state.project
        const users = this.state.users
        var data = {data: [], links: []}
        var projectUsers = []
        if (users){

            users.map((user, i) =>{
                projectUsers.push({
                    key: user.id,
                    label: user.firstname + " " + user.lastname
                })
            })
            gantt.serverList("users", projectUsers)
        }
        if(project){

        }
        if (tasks) {
            tasks.map(function (task, i) {
                data.data.push( {
                    id: task.id,
                    text: task.name,
                    start_date: new Date(task.startAt),
                    end_date: new Date(task.endAt),
                    //duration: task.timeSpend,
                    progress: task.status.percentage /100,
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
                <div>
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
                            onLinkUpdated={this.logLinkUpdate}
                            reloadHandle={this.reloadTasks}
                        />
                    </div>
                    <MessageArea
                        messages={this.state.messages}
                    />
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="content__header">

                    </div>
                    <ReactTable
                        data={[]}
                        columns={[]}
                        showPageSizeOptions={false}
                        defaultPageSize={10}
                        previousText={'Précedent'}
                        nextText={'Suivant'}
                        loadingText={'Chargement'}
                        noDataText='Aucun tache trouvé'
                        pageText='Page'
                        ofText='sur'
                        rowsText='lignes'
                    />
                </div>
            )
        }

    }
}


const GanttHeader = props => {
    return (
        <div>
            <h1 style={{margin: 0}}>Participants au projet : {'toto'}</h1>
            <Link to={"/projects"}>
                Retour aux projets
            </Link>
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
