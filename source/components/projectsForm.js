import React from "react"
import {string, object, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"

const Form = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <label htmlFor="name" style={{display: 'block'}}>
                Nom du projet
            </label>
            <input
                id="name"
                placeholder="Nom du projet"
                type="text"
                value={props.values.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={props.errors.name && props.touched.name
                    ? 'text-input error'
                    : 'text-input'}
            />
            {props.errors.name &&
            props.touched.name && <div className="input-feedback">{props.errors.name}</div>}


            <button type="submit" disabled={props.isSubmitting}>
                Go!
            </button>

        </form>
    )

}

class ProjectsForm extends React.Component {

    handleSubmit(values, {setSubmitting}) {
        setTimeout(() => {
            const changed = diff(this.initialValues, values)
            console.log(apiHelpers.apiPatch("project/" + this.editing, values))
            // alert(JSON.stringify(changed, null, 2))
            setSubmitting(false)
        }, 100)
    }

    render() {

        let editingProject
        if (this.props.editing === "new") {
            editingProject = false
        } else {
            editingProject = this.props.projects.entities.projects[this.props.editing]
        }
        return (
            <div>
                <Formik
                    {...this.props}
                    validationSchema={
                        object().shape({
                            name: string()
                                .required('Vous devez saisir un nom pour votre projet !'),
                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        name: editingProject.name,
                    }}
                    render={formikProps =>
                        <Form {...formikProps} displayName={"UsersInnerForm"}/>
                    }
                />
                <button onClick={this.props.setEditing(false)}>
                    X
                </button>
                <hr/>
            </div>
        )

    }
}

export default ProjectsForm