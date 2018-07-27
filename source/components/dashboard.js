import React from "react"
import ReactGantt from 'gantt-for-react'


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewMode: "Day",
            tasks: [
                {
                    id: "1",
                    name: 'Redesign website',
                    start: '2016-12-28',
                    end: '2016-12-31',
                    progress: 20,
                    dependencies: '',
                    custom_class: 'bar-milestone' // optional
                },{
                    id: "2",
                    name: 'Redesign arse',
                    start: '2016-12-29',
                    end: '2017-01-01',
                    progress: 20,
                    dependencies: '1',
                    custom_class: 'bar-milestone' // optional
                },{
                    id: "3",
                    name: 'Redesign dickbutt',
                    start: '2016-12-30',
                    end: '2017-01-03',
                    progress: 20,
                    dependencies: '1',
                    custom_class: 'bar-milestone' // optional
                },{
                    id: "4",
                    name: 'Redesign your butt',
                    start: '2016-12-30',
                    end: '2017-01-06',
                    progress: 20,
                    dependencies: '3, 2',
                    // custom_class: 'bar-milestone' // optional
                }
            ],
        }
    }
    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <h1 style={{margin: 0}}>Tableau de bord</h1>
                </div>
                <div className="content__inner">
                    <ReactGantt
                        tasks={this.state.tasks}
                        viewMode={this.state.viewMode}
                        step={10}
                        arrow_curve={10}
                        // scrollOffsets={this.state.scrollOffsets}
                        //
                        // onClick={this._func}
                        // onDateChange={this._func}
                        // onProgressChange={this._func}
                        // onViewChange={this._func}
                        // customPopupHtml={this._html_func}
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard