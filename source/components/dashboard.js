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
import UsersForm from "./usersForm"
import jobSchema from "../schemas/jobs"

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
            tasksStatus: false,
            editing: false,
            jobs: false

        }
        this.setEditing = this.setEditing.bind(this)

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
            apiHelpers.apiGet("jobs").then((response) => {
                this.setState({jobs: normalize(response.data, jobSchema)})
            })
        })
    }

    reloadProjects() {
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
            apiHelpers.apiGet("jobs").then((response) => {
                this.setState({jobs: normalize(response.data, jobSchema)})
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
                                user={this.state.user}
                                editing={this.state.editing}
                                jobs={this.state.jobs}
                                setEditing={this.setEditing}
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
        const user = this.props.user
        const jobs = this.props.jobs

        if (typeof tasks.entities !== 'undefined' && typeof projects.entities !== 'undefined' && typeof user !== 'undefined' && typeof jobs !== 'undefined') {
            return (
                <div>
                    <div>
                        {this.props.editing
                            ? <UsersForm
                                users={user}
                                jobs={jobs}
                                editing={this.props.editing}
                                setEditing={this.props.setEditing}
                                type={"editing-profile"}/>
                            : ""
                        }
                    </div>
                    <div className="row">
                        <div className="row__col-50">
                            <Card
                                title={"Mes projets"}
                                data={projects.result}
                                entities={projects.entities.projects}
                                type={"projects"}
                            />
                        </div>
                        <div className="row__col-50">
                            <Card
                                title={"Mes tâches"}
                                data={tasks.result}
                                entities={tasks.entities.tasks}
                                type={"tasks"}
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
                    <div className="row">
                        <div className="row__col-100">
                            <Card
                                title={"Mon profil"}
                                data={user}
                                entities={false}
                                type={"user"}
                                setEditing={this.props.setEditing}
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="row__col-50">
                            <Card
                                title={"Mes projets"}
                                data={false}
                                entities={false}
                                type={"projects"}
                            />
                        </div>
                        <div className="row__col-50">
                            <Card
                                title={"Mes tâches"}
                                data={false}
                                entities={false}
                                type={"tasks"}
                            />
                        </div>
                        <div className="row__col-50">
                            <CardPieCharts
                                title={"Activités des tâches"}
                                data={false}
                                entities={false}
                                type={"tasks-charts"}
                                tasksStatus={tasksStatus}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="row__col-100">
                            <Card
                                title={"Mon profil"}
                                data={false}
                                entities={false}
                                type={"user"}
                            />
                        </div>
                    </div>
                </div>
            )
        }


    }
}

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.entities) {
            this.columns = [
                {
                    id: "name",
                    Header: 'Nom',
                    accessor: id => this.props.entities[id].name
                }]
        }
        if (this.props.entities && this.props.data && this.columns) {
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
        } else if (this.props.type == 'user' && this.props.data) {
            return (
                <div className="card card__profile">
                    <div className="card__header">
                        <h2 className="card__header--title">{this.props.title}</h2>
                    </div>
                    <div className="card__body card__body--height">
                        <div className="row">
                            <div className="row__col-50 flex flex__align-center flex__justify-content profile__icon">
                                <i className="far fa-user"></i>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row__col-50">
                                <div className="row">
                                    <div className="row__col-50">
                                        <p>Prenom : {this.props.data.lastname}</p>
                                        <p>Nom : {this.props.data.firstname}</p>
                                        <p>Email : {this.props.data.email}</p>
                                        <p>Job : {this.props.data.job.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row__col-50 flex flex__justify-content flex__align-center">
                            <button className="content__header--button" onClick={this.props.setEditing(this.props.data.id)}>
                                <i className="fas fa-user-edit"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            if (this.props.type == "user") {
                console.log(this.props.type)
                return (
                    <div className="card card__profile">
                        <div className="card__header">
                            <h2 className="card__header--title">{this.props.title}</h2>
                        </div>
                        <div className="card__body">
                            <Loading/>
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
                            options={this.pieOptions}
                            graph_id="PieChart"
                            width={"100%"}
                            height={"240px"}
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