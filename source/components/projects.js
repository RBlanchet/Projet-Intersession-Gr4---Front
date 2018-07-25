import React from "react"
import {normalize} from 'normalizr'
import apiHelpers from "../helpers/apiHelpers"
import projectSchema from "../schemas/projects"
import ProjectsForm from "./projectsForm"


class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: false
        }
    }

    componentDidMount() {
        apiHelpers.apiGet("projects").then((response) => {
            this.setState({projects: normalize(response.data, projectSchema)})
        })
    }

    render() {
        return (
            <div className={"content"}>
                <div className="content__header">
                    <ProjectsHeader projects={this.state.projects} editing={this.state.editing}/>
                </div>
                <div className="content__inner">
                    <ProjectsCRUD projects={this.state.projects}/>
                </div>
            </div>
        )
    }
}


const ProjectsHeader = () => {
    return (
        <h1 style={{margin: 0}}>Projets</h1>
    )
}

class ProjectsCRUD extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        this.setEditing = this.setEditing.bind(this)
    }

    setEditing(id) {
        return () => {
            this.setState({editing: false})
            setTimeout(() => {
                this.setState({editing: id})
            }, 1)
        }
    }

    render() {
        const projects = this.props.projects
        if (projects.result) {
            return (
                <div>
                    <div>
                        {
                            this.state.editing
                                ? <ProjectsForm
                                    projects={projects}
                                    editing={this.state.editing}
                                    setEditing={this.setEditing}/>
                                : ""
                        }
                    </div>
                    <div>
                        {projects.result.map(projectId => (
                            <div key={projectId} onClick={this.setEditing(projectId)}>
                                {projects.entities.projects[projectId].name}
                            </div>
                        ))}
                    </div>
                    <button onClick={this.setEditing("new")}>Créer un projet</button>
                </div>
            )
        } else {
            return "Chargement... "
        }
    }

}

export default Projects