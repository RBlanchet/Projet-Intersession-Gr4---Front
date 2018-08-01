import React from "react"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import ReactTable from "react-table"
import ReactDOM from "react-dom"
import {Chart} from "react-google-charts"
import taskSchema from "../schemas/tasks"

class ProjectGantt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false,
            editing: false,
            columns: [
                {type: "string", label: "Task ID"},
                {type: "string", label: "Task Name"},
                {type: "date", label: "Start Date"},
                {type: "date", label: "End Date"},
                {type: "number", label: "Duration"},
                {type: "number", label: "Percent Complete"},
                {type: "string", label: "Dependencies"}
            ]
        }
    }

    componentDidMount() {
        apiHelpers.apiGet(`projects/${this.props.match.params.id}/tasks`).then((response) => {
            this.setState({tasks: response.data})
        })
    }

    render() {
        const tasks = this.state.tasks
        var rows = []
        if (tasks){
tasks.map(function(task, i){
    rows[i] = [task.id, task.name, new Date(task.startAt), new Date(task.endAt), task.timeSpend, task.active ? 0: 100, task.parent]
})
        }
        return (
            <div className="Gantt">
                <div className="content__inner">
                <Chart
                    chartType="Gantt"
                    data={[this.state.columns, ...rows]}
                    width="100%"
                    height="50%"
                    legendToggle
                />
                    <div>
                        Amagantt
                    </div>
                </div>
            </div>
        )
    }
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

export default ProjectGantt
