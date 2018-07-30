import React from "react"
import {string, object, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"

const Form = (props) => {

    return (
        <div className={"form-modal__overlay"} onClick={props.setEditing(false)}>
            <div className={"form-modal"} onClick={(e) => {
                e.stopPropagation()
            }}>
                <form onSubmit={props.handleSubmit} className={"form"}>
                    <div className={"form__input-block form__input-block--double"}>
                        <label htmlFor="name" style={{display: 'block'}}>
                            Nom de la tache
                        </label>
                        <input
                            id="name"
                            placeholder="Nom de la tache"
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
                        <div className="input-feedback">{props.errors.name}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
                            Date de début
                        </label>
                        <input
                            id="start_at"
                            placeholder="2000-01-01"
                            type="date"
                            value={props.values.start_at}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.start_at && props.touched.start_at
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.start_at &&
                        props.touched.start_at &&
                        <div className="form__error">{props.errors.start_at}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" className={"form__label"}>
                            Date de fin
                        </label>
                        <input
                            id="end_at"
                            placeholder="2000-01-01"
                            type="date"
                            value={props.values.end_at}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.end_at && props.touched.end_at
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.end_at &&
                        props.touched.end_at &&
                        <div className="form__error">{props.errors.end_at}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label htmlFor="name" style={{display: 'block'}}>
                            Description de la tache
                        </label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            value={props.values.description}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.description && props.touched.description
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.description &&
                        props.touched.description &&
                        <div className="input-feedback">{props.errors.description}</div>}
                    </div>


                    <div className={"form__input-block"}>
                        <label htmlFor="name" style={{display: 'block'}}>
                            Statut de la tache
                        </label>
                        <select
                            id="status"
                            value={props.values.status}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.status && props.touched.status
                                ? 'text-input error'
                                : 'text-input'
                            }
                        >
                            <option value='to_do'>A faire</option>
                            <option value='in_progress'>En cours</option>
                            <option value='finished'>Terminée</option>
                            <option value='validated'>Validée</option>
                        </select>
                        {props.errors.status &&
                        props.touched.status &&
                        <div className="input-feedback">{props.errors.status}</div>}
                    </div>
                    <div className={"form__input-block"}>
                        <label htmlFor="name" style={{display: 'block'}}>
                            Prix de la tache
                        </label>
                        <input
                            id="cost"
                            placeholder="prix de la tache"
                            type="number"
                            value={props.values.cost}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.cost && props.touched.cost
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.cost &&
                        props.touched.cost &&
                        <div className="input-feedback">{props.errors.cost}</div>}
                    </div>
                    <div className={"form__input-block form__input-block--double"}>
                        <label htmlFor="name" className={"form__label"}>
                            Heure alloué à la tache
                        </label>
                        <input
                            id="time_spend"
                            placeholder="Temps passé (optionnel)"
                            type="number"
                            value={props.values.time_spend}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.time_spend && props.touched.time_spend
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.time_spend &&
                        props.touched.time_spend &&
                        <div className="form__error">{props.errors.time_spend}</div>}
                    </div>
                    <div className={"form__buttons"}>
                        <button className={"form__button"} type="submit" disabled={props.isSubmitting}>
                            Valider
                        </button>
                        {props.editing !== "new"
                            ? <button className={"form__button form__button--red"}
                                      onClick={props.deleteTask(props.editing)} type="button">
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

class TasksForm extends React.Component {

    handleSubmit(values, {setSubmitting}) {
        setTimeout(() => {
            const changed = diff(this.initialValues, values)
            console.log(apiHelpers.apiPatch("tasks/" + this.editing, values))
            // alert(JSON.stringify(changed, null, 2))
            setSubmitting(false)
        }, 100)
    }

    deleteTask(id) {
        return () => {
            apiHelpers.apiDelete("tasks", id).then(response => {
                console.log(response)
                this.setEditing(false)()
                // TODO: feedback
            })
        }
    }

    render() {

        let editingTask
        if (this.props.editing === "new") {
            editingTask = false
        } else {
            editingTask = this.props.tasks.entities.tasks[this.props.editing]
        }
        return (
            <div>
                <Formik
                    {...this.props}
                    validationSchema={
                        object().shape({
                            name: string()
                                .required('Vous devez saisir un nom pour votre tache !'),
                            description: string()
                                .required('Vous devez saisir une description pour votre tâche !'),
                            status: string()
                                .required('Vous devez préciser un statut pour votre tâche !'),
                            start_at: string()
                                .required('Vous devez saisir une date'),
                            end_at: string()
                                .required('Vous devez saisir une date'),
                            cost: string()
                                .required('Le prix ne peut être négatif'),


                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        name: editingTask.name,
                        start_at: editingTask.start_at ? editingTask.start_at.substr(0, 10) : null,
                        end_at: editingTask.end_at ? editingTask.end_at.substr(0, 10) : null,

                        cost: editingTask.cost,
                        time_spend: editingTask.hour_spend,
                        description: editingTask.description,
                        status: editingTask.status,
                    }}
                    render={formikProps =>
                        <Form {...formikProps} displayName={"TasksInnerForm"}
                              setEditing={this.props.setEditing}
                              editing={this.props.editing}
                              deleteTask={this.deleteTask}/>
                    }
                />

            </div>
        )
    }
}

export default TasksForm