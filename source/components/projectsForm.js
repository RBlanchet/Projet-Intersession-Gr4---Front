import React from "react"
import {string, object, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"
import swal from "sweetalert"

const Form = (props) => {

    return (
        <div className={"form-modal__overlay"} onClick={props.setEditing(false)}>
            <div className={"form-modal"} onClick={(e) => {
                e.stopPropagation()
            }}>
                <form onSubmit={props.handleSubmit} className={"form"}>
                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="name">
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
                        props.touched.name &&
                        <div className="form__error">{props.errors.name}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
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
                        props.touched.date_start &&
                        <div className="form__error">{props.errors.date_start}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
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
                        props.touched.hour_start &&
                        <div className="form__error">{props.errors.hour_start}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
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
                        props.touched.date_end &&
                        <div className="form__error">{props.errors.date_end}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
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
                        props.touched.hour_end &&
                        <div className="form__error">{props.errors.hour_end}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
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
                        props.touched.cost &&
                        <div className="form__error">{props.errors.cost}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
                            Budget
                        </label>
                        <input
                            id="price"
                            placeholder="Budget du projet"
                            type="text"
                            value={props.values.price}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.price && props.touched.price
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.price &&
                        props.touched.price &&
                        <div className="form__error">{props.errors.price}</div>}
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label htmlFor="name" className={"form__label"}>
                            Heure alloué au projet
                        </label>
                        <input
                            id="hour_pool"
                            placeholder="Nombre d'heures"
                            type="integer"
                            value={props.values.hour_pool}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.hour_pool && props.touched.hour_pool
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.hour_pool &&
                        props.touched.hour_pool &&
                        <div className="form__error">{props.errors.hour_pool}</div>}
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label htmlFor="name" className={"form__label"}>
                            Heure alloué au projet
                        </label>
                        <textarea
                            id="description"
                            placeholder="Description du projet"
                            value={props.values.description}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{resize: 'none'}}
                            className={props.errors.description && props.touched.description
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.description &&
                        props.touched.description &&
                        <div className="form__error">{props.errors.description}</div>}
                    </div>

                    <div className={"form__buttons"}>
                        <button className={"form__button"} type="submit" disabled={props.isSubmitting}>
                            Valider
                        </button>
                        {props.editing !== "new"
                            ? <button className={"form__button form__button--red"}
                                      onClick={props.deleteProject(props.editing)} type="button">
                                Supprimer
                            </button>
                            : <button className={"form__button form__button--red"} onClick={props.setEditing(false)}
                                      type="button">
                                Annuler
                            </button>}
                    </div>

                </form>

                <button onClick={props.setEditing(false)} className={"form-modal__close"}>
                    <i className="fas fa-times"/>
                </button>
            </div>
        </div>
    )

}

class ProjectsForm extends React.Component {

    handleSubmit(values, {setSubmitting}) {
        let changed = diff(this.initialValues, values)
        // Init date + hour
        changed.date_start = values.date_start + ' ' + values.hour_start + ':00'
        changed.date_end = values.date_end + ' ' + values.hour_end + ':00'
        // Delete element hour
        delete changed.hour_start
        delete changed.hour_end
        if (this.editing !== "new") {
            apiHelpers.apiPatch("projects", changed, this.editing).then(response => {
                this.setEditing(false)()
            }).catch((r) => {
                console.log(r)
                swal({
                    title: "Oups!",
                    text: "Une erreur est survenue!",
                    icon: "error",
                    button: "Ok!",
                })
                setSubmitting(false)
            })
        } else {
            apiHelpers.apiPost("projects", changed).then(response => {
                this.setEditing(false)()
            }).catch((r) => {
                console.log(r)
                swal({
                    title: "Oups!",
                    text: "Une erreur est survenue!",
                    icon: "error",
                    button: "Ok!",
                })
                setSubmitting(false)
            })
            setSubmitting(false)
        }
    }

    deleteProject(id) {
        return () => {
            apiHelpers.apiDelete("projects", id).then(response => {
                this.setEditing(false)()
                swal({
                    text: "Le projet à bien été supprimé!",
                    icon: "success",
                    button: "Ok!",
                })
            })
        }
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
                            price: string()
                                .required('Le budget ne peut être négatif'),
                            hour_pool: string()
                                .matches(/^\d+$/, "Ce n'est pas un format d'heure valide"),
                            description: string()
                                .required('La description ne peut être vide')
                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        name: editingProject.name,
                        date_start: editingProject.date_start ? editingProject.date_start.substr(0, 10) : null,
                        hour_start: editingProject.date_start ? editingProject.date_start.substr(11, 5) : null,
                        date_end: editingProject.date_end ? editingProject.date_end.substr(0, 10) : null,
                        hour_end: editingProject.date_end ? editingProject.date_end.substr(11, 5) : null,
                        cost: editingProject.cost,
                        price: editingProject.price,
                        hour_pool: editingProject.hour_pool,
                        description: editingProject.description
                    }}
                    render={formikProps =>
                        <Form {...formikProps}
                              displayName={"ProjectsInnerForm"}
                              setEditing={this.props.setEditing}
                              editing={this.props.editing}
                              deleteProject={this.deleteProject}
                        />
                    }
                />
            </div>
        )

    }
}

export default ProjectsForm