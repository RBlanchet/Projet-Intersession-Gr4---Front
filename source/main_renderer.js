import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route} from "react-router-dom"

import Nav from "./components/nav"
import Login from "./components/login"
import Users from "./components/users"

const Main = () => (
    <Router>
        <div>
            <Nav/>

            <hr/>

            <Route exact path="/" component={Login}/>
            <Route path="/reset-password" component={Login}/>

            <Route path="/users" component={Users}/>

            <Route path="/dashboard" component={Dashboard}/>
        </div>
    </Router>
)
// onEnter={requireAuth}


const Dashboard = () => (
    <div>
        <h2>Tableau de bord</h2>
    </div>
)


const main = document.getElementById("main")

ReactDOM.render(<Main/>, main)
