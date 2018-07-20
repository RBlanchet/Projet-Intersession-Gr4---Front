import React from "react"
import {Link} from "react-router-dom"
import connectionHelpers from "../connectionHelpers"


class Dashboard extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <h1 style={{margin: 0}}>Tableau de bord</h1>
                </div>
                <div className="content__inner">
                    Something something
                </div>
            </div>
        )
    }
}

export default Dashboard