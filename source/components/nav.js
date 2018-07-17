import React from "react"
import {Link} from "react-router-dom"

class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (true) {

            return (
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            )
        } else {
            return ""
        }
    }
}

export default Nav