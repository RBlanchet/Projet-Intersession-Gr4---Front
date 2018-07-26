import React from "react"
import {string, object, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import  MultiSelectReact  from 'multi-select-react';
import apiHelpers from "../helpers/apiHelpers"

const Form = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
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

                <label htmlFor="name" style={{display: 'block'}}>
                    Date de début
                </label>
                <input
                    id="date_start"
                    placeholder="2000-01-01"
                    type="date"
                    value={props.values.date_start}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.errors.date_start && props.touched.date_start
                        ? 'text-input error'
                        : 'text-input'}
                />
                {props.errors.date_start &&
                props.touched.date_start && <div className="input-feedback">{props.errors.date_start}</div>}

                <label htmlFor="name" style={{display: 'block'}}>
                    Heure de début
                </label>
                <input
                    id="hour_start"
                    placeholder="00:00"
                    type="text"
                    value={props.values.hour_start}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.errors.hour_start && props.touched.hour_start
                        ? 'text-input error'
                        : 'text-input'}
                />
                {props.errors.hour_start &&
                props.touched.hour_start && <div className="input-feedback">{props.errors.hour_start}</div>}

                <label htmlFor="name" style={{display: 'block'}}>
                    Date de fin
                </label>
                <input
                    id="date_end"
                    placeholder="2000-01-01"
                    type="date"
                    value={props.values.date_end}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.errors.date_end && props.touched.date_end
                        ? 'text-input error'
                        : 'text-input'}
                />
                {props.errors.date_end &&
                props.touched.date_end && <div className="input-feedback">{props.errors.date_end}</div>}

                <label htmlFor="name" style={{display: 'block'}}>
                    Heure de fin
                </label>
                <input
                    id="hour_end"
                    placeholder="00:00"
                    type="text"
                    value={props.values.hour_end}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.errors.hour_end && props.touched.hour_end
                        ? 'text-input error'
                        : 'text-input'}
                />
                {props.errors.hour_end &&
                props.touched.hour_end && <div className="input-feedback">{props.errors.hour_end}</div>}


                <label htmlFor="name" style={{display: 'block'}}>
                    Coût du projet
                </label>
                <input
                    id="cost"
                    placeholder="Coût du projet"
                    type="text"
                    value={props.values.cost}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.errors.cost && props.touched.cost
                        ? 'text-input error'
                        : 'text-input'}
                />
                {props.errors.cost &&
                props.touched.cost && <div className="input-feedback">{props.errors.cost}</div>}

                <label htmlFor="name" style={{display: 'block'}}>
                    Budget
                </label>
                <input
                    id="budget"
                    placeholder="Budget du projet"
                    type="text"
                    value={props.values.budget}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={props.errors.budget && props.touched.budget
                        ? 'text-input error'
                        : 'text-input'}
                />
                {props.errors.budget &&
                props.touched.budget && <div className="input-feedback">{props.errors.budget}</div>}
                <button type="submit" disabled={props.isSubmitting}>
                    Go!
                </button>
            </div>
            <div>
                <label>
                    
                </label>
            </div>
        </form>
    )

}

class ProjectsForm extends React.Component {

    // handleSubmit(values, {setSubmitting}) {
    //     setTimeout(() => {
    //         const changed = diff(this.initialValues, values)
    //         console.log(apiHelpers.apiPatch("projects/" + this.editing, values))
    //         // alert(JSON.stringify(changed, null, 2))
    //         setSubmitting(false)
    //     }, 100)
    // }

    handleSubmit(values, {setSubmitting}) {
        let data = values
        // Init date + hour
        data.date_start = data.date_start + ' ' + data.hour_start + ':00'
        data.date_end = data.date_end + ' ' + data.hour_end + ':00'
        // Delete element hour
        delete data.hour_start
        delete data.hour_end
        let changed = diff(this.initialValues, data)
        console.log(changed)
        // if (this.editing !== "new") {
        //     apiHelpers.apiPatch("users", changed, this.editing).then(response => {
        //         if (response.status === 200) {
        //             this.setEditing(false)()
        //         } else {
        //             // TODO: error feedback
        //             setSubmitting(false)
        //         }
        //     })
        // } else {
        //     if (changed.plainPassword) {
        //         apiHelpers.apiPost("users", changed).then(response => {
        //             if (response.status === 201) {
        //                 this.setEditing(false)()
        //             } else {
        //                 // TODO: error feedback
        //                 setSubmitting(false)
        //             }
        //         })
        //     } else {
        //         // TODO error feedback
        //     }
        //     setSubmitting(false)
        // }
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
                            hour_start: string()
                                .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Votre date n'est pas au bon format"),
                            date_start: string()
                                .required('Vous devez saisir une date'),
                            hour_end: string()
                                .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Votre date n'est pas au bon format"),
                            date_end: string()
                                .required('Vous devez saisir une date'),
                            cost: string()
                                .required('Le prix ne peut être négatif'),
                            budget: string()
                                .required('Le budget ne peut être négatif'),
                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        name: editingProject.name,
                        date_start: editingProject.date_start ? editingProject.date_start.substr(0, 10) : null,
                        hour_start: editingProject.date_start ? editingProject.date_start.substr(11,5) : null,
                        date_end: editingProject.date_end ? editingProject.date_end.substr(0, 10) : null,
                        hour_end: editingProject.date_end ? editingProject.date_end.substr(11,5) : null,
                        cost: editingProject.cost,
                        budget: editingProject.budget,
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