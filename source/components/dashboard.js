import React from "react"
import Chart from "react-google-charts"
import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import projectSchema from "../schemas/projects"
import taskSchema from "../schemas/tasks"
import {Link} from "react-router-dom"
import ReactTable from "react-table"
import {taskStatus} from "../schemas/schemas"
import styled from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

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
            tasksStatus: false
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
            apiHelpers.apiGet("users/" + response.data.id + "/tasks-status").then((response) => {
                this.setState({tasksStatus: response.data})
            })
        })
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName="slide">
                <div>
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
                                tasksStatus={this.state.tasksStatus}
                            />
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
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
        const tasksStatus = this.props.tasksStatus

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
                    <div className="row__col-50">
                        <CardPieCharts
                            title={"Activités des tâches"}
                            data={tasks.result}
                            entities={tasks.entities.tasks}
                            type={"tasks-charts"}
                            tasksStatus={tasksStatus}
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
                    <div className="row__col-50">
                        <CardPieCharts
                            title={"Activités des tâches"}
                            data={tasks.result}
                            entities={false}
                            type={"tasks-charts"}
                            tasksStatus={tasksStatus}
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
                }]
        } else if (props.type == 'projects') {
            this.columns = [{
                id: "name",
                Header: 'Nom',
                accessor: id => this.props.entities[id].name
            }]
        } else if (props.type == 'tasks-charts') {
            this.pieOptions = [{
                title: "",
                pieHole: 0.6,
                slices: [
                    {
                        color: "#2BB673"
                    },
                    {
                        color: "#d91e48"
                    },
                    {
                        color: "#007fad"
                    },
                    {
                        color: "#e9a227"
                    }
                ],
                legend: {
                    position: "bottom",
                    alignment: "center",
                    textStyle: {
                        color: "233238",
                        fontSize: 14
                    }
                },
                tooltip: {
                    showColorCode: true
                },
                chartArea: {
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "80%"
                },
                fontName: "Roboto"
            }]
        }

    }

    render() {
        if (this.props.entities) {
            if (this.props.type != 'tasks-charts') {
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
                            <Chart
                                chartType="PieChart"
                                data={[["Age", "Weight"], ["Age", 12], ["Caca", 5.5]]}
                                options={this.pieOptions}
                                graph_id="PieChart"
                                width={"100%"}
                                height={"239px"}
                                legend_toggle
                            />
                        </div>
                    </div>
                )
            }
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

class CardPieCharts extends React.Component {
    constructor(props) {
        super(props)
        this.pieOptions = [{
            title: "",
            pieHole: 0.6,
            slices: [
                {
                    color: "#2BB673"
                },
                {
                    color: "#d91e48"
                },
                {
                    color: "#007fad"
                },
                {
                    color: "#e9a227"
                }
            ],
            legend: {
                position: "bottom",
                alignment: "center",
                textStyle: {
                    color: "233238",
                    fontSize: 14
                }
            },
            tooltip: {
                showColorCode: true
            },
            chartArea: {
                left: 0,
                top: 0,
                width: "100%",
                height: "80%"
            },
            fontName: "Roboto"
        }]
    }

    render() {
        const tasksStatus = this.props.tasksStatus
        if (tasksStatus) {
            return (
                <div className="card">
                    <div className="card__header">
                        <h2 className="card__header--title">{this.props.title}</h2>
                    </div>
                    <div className="card__body">
                        <Chart
                            chartType="PieChart"
                            data={[["Label", "Value"], tasksStatus.data[1], tasksStatus.data[2], tasksStatus.data[3], tasksStatus.data[4]]}
                            // data={[["En Cours", "A faire", "Finit", "Validée"], ["En Cours", 4], ["A faire", 4], ["Finit", 4], ["Validée", 4]]}
                            options={this.pieOptions}
                            graph_id="PieChart"
                            width={"100%"}
                            height={"239px"}
                            legend_toggle
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