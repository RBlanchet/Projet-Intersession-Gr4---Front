import React from "react"
import {string, object, array} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"
import Select from './select'

const Form = (props) => {

    let users = []
    {
        Object.keys(props.roles.entities.users).map((key) => {
            const user = props.roles.entities.users[key]
            users.push({value: user.id, label: `${user.firstname} ${user.lastname}`})
        })
    }

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
                        <label htmlFor="start_at" className={"form__label"}>
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
                        <label htmlFor="end_at" className={"form__label"}>
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
                        <label htmlFor="description" style={{display: 'block'}}>
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
                        <label htmlFor="status" style={{display: 'block'}}>
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
                            }>
                            <option value='1'>A faire</option>
                            <option value='2'>En cours</option>
                            <option value='3'>Terminée</option>
                            <option value='4'>Validée</option>
                        </select>
                        {props.errors.status &&
                        props.touched.status &&
                        <div className="input-feedback">{props.errors.status}</div>}
                    </div>
                    <div className={"form__input-block"}>
                        <label htmlFor="cost" style={{display: 'block'}}>
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
                        <Select
                            value={props.values.users}
                            onChange={props.setFieldValue}
                            options={users}
                            placeholder={"Utilisateurs"}
                            onBlur={props.handleBlur}
                            fieldName="users"
                        />
                        {props.errors.users &&
                        props.touched.users &&
                        <div className="input-feedback">{props.errors.users}</div>}
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label htmlFor="time_spend" className={"form__label"}>
                            Heures allouées à la tache
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
        const projectId = this.projectId
        const changed = diff(this.initialValues, values)
        const users = changed.users
        changed.users = []
        changed.start_at += "T00:00:00+00:00"
        changed.end_at += "T00:00:00+00:00"
        console.log(changed, users)
        users.map(user => {
            changed.users.push(user.value)
        })
        if (this.editing === "new") {
            apiHelpers.apiPost(`project/${projectId}/tasks`, changed).then(response => {
                if (response.status === 201) {
                    this.setEditing(false)()
                } else {
                    // TODO: error feedback
                    setSubmitting(false)
                }
            })
        } else {
            apiHelpers.apiPatch("tasks", changed, this.editing).then(response => {
                if (response.status === 201) {
                    this.setEditing(false)()
                } else {
                    // TODO: error feedback
                    setSubmitting(false)
                }
            })
        }
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
        let taskUsers
        if (this.props.editing === "new") {
            editingTask = false
            taskUsers = []
        } else {
            editingTask = this.props.tasks.entities.tasks[this.props.editing]
            console.log(editingTask.users)
            // TODO: FUCK SOME FUCKING MORMONS!
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
                            users: array()
                                .required("Veuillez choisir au moins 1 utilisateur")
                                .min(1, "Veuillez choisir au moins 1 utilisateur"),
                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        name: editingTask.name,
                        start_at: editingTask.start_at ? editingTask.start_at.substr(0, 10) : "",
                        end_at: editingTask.end_at ? editingTask.end_at.substr(0, 10) : "",
                        cost: editingTask.cost,
                        time_spend: editingTask.time_spend,
                        description: editingTask.description,
                        status: editingTask.status,
                        // users: [{label: "Admin Admin", value: 1}]
                    }}
                    render={formikProps =>
                        <Form {...formikProps} displayName={"TasksInnerForm"}
                              setEditing={this.props.setEditing}
                              editing={this.props.editing}
                              deleteTask={this.deleteTask}
                              roles={this.props.roles}/>
                    }
                />

            </div>
        )
    }
}

export default TasksForm