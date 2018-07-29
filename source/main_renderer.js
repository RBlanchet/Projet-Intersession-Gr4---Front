import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route} from "react-router-dom"

import Nav from "./components/nav"
import Login from "./components/login"
import Users from "./components/users"
import ProjecTasks from "./components/projectTasks"
import Tasks from "./components/tasks"
import Dashboard from "./components/dashboard"
import Projects from "./components/projects"

const Main = () => (
    <Router>
        <main className={"main"}>
            <Nav/>

            <Route exact path="/" component={Login}/>
            <Route path="/reset-password" component={Login}/>

            <Route path="/users" component={Users}/>

            <Route exact path="/projects" component={Projects}/>
            <Route path="/projects/:id/tasks" component={ProjecTasks}/>

            <Route path="/tasks" component={Tasks}/>

            <Route path="/dashboard" component={Dashboard}/>
        </main>
    </Router>
)


const main = document.getElementById("main")

ReactDOM.render(<Main/>, main)
