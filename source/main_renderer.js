import * as ReactDOM from 'react-dom'
import React from "react"
import {HashRouter as Router, Route, Link, Redirect} from "react-router-dom"

import Nav from "./components/nav"

const Main = () => (
    <Router>
        <div>
            <Nav/>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
        </div>
    </Router>
)

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)


const About = () => (
    <div>
        <h2>About</h2>
    </div>
)


const main = document.getElementById("main")

ReactDOM.render(<Main/>, main)
