import React from "react"
import Chart from "react-google-charts"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import projectSchema from "../schemas/projects"
import taskSchema from "../schemas/tasks"
import {Link} from "react-router-dom"
import ReactTable from "react-table"
import {taskStatus} from "../schemas/schemas"

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewMode: "Day",
            columns: [
                {type: "string", label: "Task ID"},
                {type: "string", label: "Task Name"},
                {type: "date", label: "Start Date"},
                {type: "date", label: "End Date"},
                {type: "number", label: "Duration"},
                {type: "number", label: "Percent Complete"},
                {type: "string", label: "Dependencies"}
            ],
            rows: [
                [
                    "Research",
                    "Find sources",
                    new Date(2015, 0, 1),
                    new Date(2015, 0, 5),
                    null,
                    100,
                    null
                ],
                [
                    "Write",
                    "Write paper",
                    null,
                    new Date(2015, 0, 9),
                    daysToMilliseconds(3),
                    25,
                    "Research,Outline"
                ],
                [
                    "Cite",
                    "Create bibliography",
                    null,
                    new Date(2015, 0, 7),
                    daysToMilliseconds(1),
                    20,
                    "Research"
                ],
                [
                    "Complete",
                    "Hand in paper",
                    null,
                    new Date(2015, 0, 10),
                    daysToMilliseconds(1),
                    0,
                    "Cite,Write"
                ],
                [
                    "Outline",
                    "Outline paper",
                    null,
                    new Date(2015, 0, 6),
                    daysToMilliseconds(1),
                    100,
                    "Research"
                ]
            ],
            projects: false,
            user: false,
            tasks: false,
            taskStatus: false
        }
    }

    componentDidMount() {
        apiHelpers.apiGet("me").then((response) => {
            this.setState({user: response.data})
            apiHelpers.apiGet("users/" + response.data.id + "/projects").then((response) => {
                this.setState({projects: normalize(response.data, projectSchema)})
            })
            apiHelpers.apiGet("users/" + response.data.id + "/tasks").then((response) => {
                this.setState({tasks: normalize(response.data, taskSchema)})
            })
        })
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <h1 className="content__header--title" style={{margin: 0}}>Tableau de bord</h1>
                </div>
                <div className="content__inner">
                    {/*<Chart*/}
                    {/*chartType="Gantt"*/}
                    {/*data={[this.state.columns, ...this.state.rows]}*/}
                    {/*width="100%"*/}
                    {/*height="50%"*/}
                    {/*legendToggle*/}
                    {/*/>*/}
                    <DashBoardCard
                        projects={this.state.projects}
                        tasks={this.state.tasks}
                    />
                </div>
            </div>
        )
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

class DashBoardCard extends React.Component {
    render() {
        const projects = this.props.projects
        const tasks = this.props.tasks

        if (typeof tasks.entities !== 'undefined' && typeof projects.entities !== 'undefined') {
            return (
                <div className="row">
                    <div className="row__col-50">
                        <Card
                            title={"Mes projets"}
                            data={projects.result}
                            entities={projects.entities.projects}
                            type={"tasks"}
                        />
                    </div>
                    <div className="row__col-50">
                        <Card
                            title={"Mes tâches"}
                            data={tasks.result}
                            entities={tasks.entities.tasks}
                            type={"projects"}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="row__col-50">
                        <Card
                            title={"Mes projets"}
                            data={projects.result}
                            entities={false}
                            type={"projects"}
                        />
                    </div>
                    <div className="row__col-50">
                        <Card
                            title={"Mes tâches"}
                            data={tasks.result}
                            entities={false}
                            type={"tasks"}
                        />
                    </div>
                </div>
            )
        }


    }
}

class Card extends React.Component {
    constructor(props) {
        super(props)
        if (props.type == 'tasks') {
            this.columns = [
                {
                    id: "name",
                    Header: 'Nom de la tache',
                    accessor: id => this.props.entities[id].name
                }, {
                    id: "status",
                    Header: 'Statut de la tâche',
                    accessor: id => this.props.entities[id].status.title
                }]
        } else {
            this.columns = [{
                id: "name",
                Header: 'Nom',
                accessor: id => this.props.entities[id].name
            }]
        }

    }

    render() {
        if (this.props.entities) {
            return (
                <div className="card">
                    <div className="card__header">
                        <h2 className="card__header--title">{this.props.title}</h2>
                    </div>
                    <div className="card__body">
                        <ReactTable
                            data={this.props.data}
                            columns={this.columns}
                            showPageSizeOptions={false}
                            defaultPageSize={5}
                            previousText={<i className="fas fa-chevron-left"></i>}
                            nextText={<i className="fas fa-chevron-right"></i>}
                            loadingText={'Chargement'}
                            noDataText='Aucun projet trouvé'
                            pageText='Page'
                            ofText='sur '
                            rowsText='lignes'
                            defaultSorted={[{
                                id: 'name'
                            }]}

                            getTdProps={(state, rowInfo, cellInfo) => {
                                return false
                            }}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card">
                    <div className="card__header">
                        <h2 className="card__header--title">{this.props.title}</h2>
                    </div>
                    <div className="card__body">
                        <Loading/>
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard