import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route, Redirect} from "react-router-dom"

import Nav from "./components/nav"
import Login from "./components/login"
import connectionHelpers from "./connectionHelpers"

const Main = () => (
    <Router>
        <div>
            <Nav/>

            <hr/>

            <Route exact path="/" component={Login}/>
            <Route path="/reset-password" component={Login}/>

            <Route path="/"/>

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
