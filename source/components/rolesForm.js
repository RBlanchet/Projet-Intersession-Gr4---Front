import React from "react"
import {string, object, number, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"

const Form = (props) => {
    const jobs = props.jobs
    return (
        <div className={"form-modal__overlay"} onClick={props.setEditing(false)}>
            <div className={"form-modal"} onClick={(e) => {
                e.stopPropagation()
            }}>
                <form onSubmit={props.handleSubmit} className={"form"}>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="cost">
                            {props.user.lastname} {props.user.firstname}
                        </label>
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="cost">
                            Coût horaire en €
                        </label>
                        <input
                            id="cost"
                            placeholder="1337.00"
                            type="text"
                            value={props.values.cost}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.cost && props.touched.cost
                                ? 'form__text form__text--error'
                                : 'form__text'}
                        />
                        {props.errors.cost &&
                        props.touched.cost && <div className="form__error">{props.errors.cost}</div>}
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="job">
                            Rôle
                        </label>
                        <div className="form__select-wrapper">
                            <select
                                name="job"
                                value={props.values.job}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                className={'form__select'}>

                                <option value="" disabled={true}>Rôle</option>
                                {jobs.result.map(jobId => (
                                    <option key={jobId} value={jobId}>
                                        {jobs.entities.jobs[jobId].name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        {props.errors.job &&
                        props.touched.job &&
                        <div className="form__error">{props.errors.job}</div>}
                    </div>

                    <div className={"form__buttons"}>
                        <button className={"form__button"} type="submit" disabled={props.isSubmitting}>
                            Valider
                        </button>
                        <button className={"form__button form__button--red"}
                                onClick={props.deleteRole(props.editing)} type="button">
                            Retirer du projet
                        </button>
                    </div>

                </form>

                <button onClick={props.setEditing(false)} className={"form-modal__close"}>
                    <i className="fas fa-times"/>
                </button>
            </div>
        </div>
    )

}

const NewForm = (props) => {
    const jobs = props.jobs
    const users = props.users
    return (
        <div className={"form-modal__overlay"} onClick={props.setEditing(false)}>
            <div className={"form-modal"} onClick={(e) => {
                e.stopPropagation()
            }}>
                <form onSubmit={props.handleSubmit} className={"form"}>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="cost">
                            Coût horaire en €
                        </label>
                        <input
                            id="cost"
                            placeholder="1337.00"
                            type="text"
                            value={props.values.cost}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.cost && props.touched.cost
                                ? 'form__text form__text--error'
                                : 'form__text'}
                        />
                        {props.errors.cost &&
                        props.touched.cost && <div className="form__error">{props.errors.cost}</div>}
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="user">
                            Utilisateur
                        </label>
                        <div className="form__select-wrapper">
                            <select
                                name="user"
                                value={props.values.user}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                className={'form__select'}>

                                <option value="" disabled={true}>Utilisateur</option>
                                {users.result.map(userId => (
                                    <option key={userId} value={userId}>
                                        {users.entities.users[userId].lastname} {users.entities.users[userId].firstname}
                                    </option>
                                ))}

                            </select>
                        </div>
                        {props.errors.user &&
                        props.touched.user &&
                        <div className="form__error">{props.errors.user}</div>}
                    </div>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="job">
                            Rôle
                        </label>
                        <div className="form__select-wrapper">
                            <select
                                name="job"
                                value={props.values.job}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                className={'form__select'}>

                                <option value="" disabled={true}>Rôle</option>
                                {jobs.result.map(jobId => (
                                    <option key={jobId} value={jobId}>
                                        {jobs.entities.jobs[jobId].name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        {props.errors.job &&
                        props.touched.job &&
                        <div className="form__error">{props.errors.job}</div>}
                    </div>

                    <div className={"form__buttons"}>
                        <button className={"form__button"} type="submit" disabled={props.isSubmitting}>
                            Valider
                        </button>
                        <button className={"form__button form__button--red"}
                                onClick={props.setEditing(false)}
                                type="button">
                            Anuller
                        </button>
                    </div>

                </form>

                <button onClick={props.setEditing(false)} className={"form-modal__close"}>
                    <i className="fas fa-times"/>
                </button>
            </div>
        </div>
    )

}

class RolesForm extends React.Component {

    handleSubmit(values, {setSubmitting}) {
        let changed = diff(this.initialValues, values)
        if (this.editing === "new") {
            const userId = changed.user
            delete changed.user
            changed.project = this.projectId
            apiHelpers.apiPost(`users/${userId}/roles`, changed).then(response => {
                if (response.status === 201) {
                    this.setEditing(false)()
                } else {
                    // TODO: error feedback
                    setSubmitting(false)
                }
            })
        } else {
            apiHelpers.apiPatch("roles", changed, this.editing).then(response => {
                if (response.status === 201) {
                    this.setEditing(false)()
                } else {
                    // TODO: error feedback
                    setSubmitting(false)
                }
            })
        }

    }

    deleteRole(id) {
        return () => {
            apiHelpers.apiDelete("roles", id).then(response => {
                this.setEditing(false)()
            })
        }
    }

    render() {

        if (this.props.editing === "new") {
            return (
                <Formik
                    {...this.props}
                    validationSchema={
                        object().shape({
                            cost: string()
                                .matches(/^\d+(\.\d{1,2})?$/, "Merci de rentrer un nombre au format XXX.XX")
                                .required("Veuillez spécifier le coût"),
                            user: number()
                                .required("Veuillez spécifier l'utilisateur"),
                            job: number()
                                .required("Veuillez spécifier le rôle"),
                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        user: "",
                        job: "",
                    }}
                    render={formikProps =>
                        <NewForm {...formikProps}
                                 displayName={"RolesInnerForm"}
                                 jobs={this.props.jobs}
                                 setEditing={this.props.setEditing}
                                 editing={this.props.editing}
                                 users={this.props.users}/>
                    }
                />
            )
        } else {
            const editingRole = this.props.roles.entities.roles[this.props.editing]
            return (
                <Formik
                    {...this.props}
                    validationSchema={
                        object().shape({
                            cost: string()
                                .matches(/^\d+(\.\d{1,2})?$/, "Merci de rentrer un nombre au format XXX.XX"),
                        })
                    }
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        cost: editingRole.cost,
                        job: editingRole.job,
                    }}
                    render={formikProps =>
                        <Form {...formikProps}
                              displayName={"RolesInnerForm"}
                              jobs={this.props.jobs}
                              setEditing={this.props.setEditing}
                              editing={this.props.editing}
                              deleteRole={this.deleteRole}
                              user={this.props.roles.entities.users[editingRole.user]}/>
                    }
                />
            )
        }

    }
}

export default RolesForm