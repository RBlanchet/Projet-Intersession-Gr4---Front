import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route} from "react-router-dom"

import Nav from "./components/nav"
import Login from "./components/login"

const Main = () => (
    <Router>
        <div>
            <Nav/>

            <hr/>

            <Route exact path="/" component={Login}/>
            <Route path="/reset-password" component={Login}/>

            <Route path="/about" component={About}/>
        </div>
    </Router>
)
// onEnter={requireAuth}


const About = () => (
    <div>
        <h2>About</h2>
    </div>
)


const main = document.getElementById("main")

ReactDOM.render(<Main/>, main)