import React from "react"
import {string, object, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers";

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
                        <label htmlFor="name" style={{display: 'block'}}>
                            Statut de la tache
                        </label>
                        <select
                            id="status"
                            value="1"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.status && props.touched.status
                                ? 'text-input error'
                                : 'text-input'
                            }
                        >
                            <option value="1">A faire</option>
                            <option value="2">En cours</option>
                            <option value="3">Terminée</option>
                            <option value="4">Validée</option>
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
                            id="hours_spend"
                            placeholder="Temps passé"
                            type="number"
                            value={props.values.hours_spend}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.hours_spend && props.touched.hours_spend
                                ? 'text-input error'
                                : 'text-input'}
                        />
                        {props.errors.hours_spend &&
                        props.touched.hours_spend &&
                        <div className="form__error">{props.errors.hours_spend}</div>}
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
                                Anuller
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
                        hour_pool: string()
                            .matches(/^\d+$/, "Ce n'est pas un format d'heure valide"),
                        hours_spend: string()
                            .required('Le nombre d\'heures ne peut etre négatif'),

                    })
                }
                onSubmit={this.handleSubmit}
                initialValues={{
                    name: editingTask.name,
                    date_start: editingTask.date_start ? editingTask.date_start.substr(0, 10) : null,
                    hour_start: editingTask.date_start ? editingTask.date_start.substr(11, 5) : null,
                    date_end: editingTask.date_end ? editingTask.date_end.substr(0, 10) : null,
                    hour_end: editingTask.date_end ? editingTask.date_end.substr(11, 5) : null,
                    cost: editingTask.cost,
                    hour_spend: editingTask.hour_spend,
                    description: editingTask.description
                }}
                render={formikProps =>
                    <Form {...formikProps} displayName={"UsersInnerForm"}
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