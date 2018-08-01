import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route} from "react-router-dom"

import Nav from "./components/nav"
import Login from "./components/login"
import Users from "./components/users"
import ProjectTasks from "./components/projectTasks"
import ProjectUsers from "./components/projectUsers"
import Tasks from "./components/tasks"
import Dashboard from "./components/dashboard"
import Projects from "./components/projects"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

const TransitionedPage = (WrappedComponent) => {
    const TransitionedComponent = (props) => (
        <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName="slide">
            <WrappedComponent {...props} />
        </ReactCSSTransitionGroup>
    );
    return TransitionedComponent;
};

const Main = () => (
    <Router>
        <section className="route-section">
            <main className={"main"}>
                <Route component={Nav} path="/:foo+"/>

                <Route exact path="/" component={TransitionedPage(Login)}/>
                <Route path="/reset-password" component={TransitionedPage(Login)}/>

                <Route path="/users" component={TransitionedPage(Users)}/>

                <Route exact path="/projects" component={TransitionedPage(Projects)}/>
                <Route path="/projects/:id/tasks" component={ProjectTasks}/>
                <Route path="/projects/:id/users" component={ProjectUsers}/>

                <Route path="/tasks" component={TransitionedPage(Tasks)}/>

                <Route path="/dashboard" component={TransitionedPage(Dashboard)}/>
            </main>
        </section>
    </Router>
)

const main = document.getElementById("main")

ReactDOM.render(<Main/>, main)
