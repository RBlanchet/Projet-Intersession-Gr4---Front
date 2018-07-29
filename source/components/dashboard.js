import React from "react"
import Chart from "react-google-charts"

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
            ]
        }
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <h1 style={{margin: 0}}>Tableau de bord</h1>
                </div>
                <div className="content__inner">
                    <Chart
                        chartType="Gantt"
                        data={[this.state.columns, ...this.state.rows]}
                        width="100%"
                        height="50%"
                        legendToggle
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard