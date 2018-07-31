import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route} from "react-router-dom"

import Nav from "./components/nav"
import Login from "./components/login"
import Users from "./components/users"
import ProjectTasks from "./components/projectTasks"
import ProjectUsers from "./components/projectUsers"
import Tasks from "./components/tasks"
import ProjectGantt from "./components/projectGantt"
import Projects from "./components/projects"

const Main = () => (
    <Router>
        <main className={"main"}>
            <Route component={Nav} path="/:foo+"/>

            <Route exact path="/" component={Login}/>
            <Route path="/reset-password" component={Login}/>

            <Route path="/users" component={Users}/>

            <Route exact path="/projects" component={Projects}/>
            <Route path="/projects/:id/tasks" component={ProjectTasks}/>
            <Route path="/projects/:id/users" component={ProjectUsers}/>
            <Route path="/projects/:id/gantt" component={ProjectGantt}/>

            <Route path="/tasks" component={Tasks}/>


        </main>
    </Router>
)

const main = document.getElementById("main")

ReactDOM.render(<Main/>, main)
