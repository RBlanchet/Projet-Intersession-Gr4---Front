import React from "react"
import {string, object, number, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"

const Form = (props) => {
    const jobs = props.jobs
    console.log(props.isSubmitting)
    return (
        <div className={"form-modal__overlay"} onClick={props.setEditing(false)}>
            <div className={"form-modal"} onClick={(e) => {
                e.stopPropagation()
            }}>
                <form onSubmit={props.handleSubmit} className={"form"}>

                    <div className={"form__input-block form__input-block--double"}>
                        <label className={"form__label"} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            placeholder="jean.dupont@example.com"
                            type="text"
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.email && props.touched.email
                                ? 'form__text form__text--error'
                                : 'form__text'}
                        />
                        {props.errors.email &&
                        props.touched.email && <div className="form__error">{props.errors.email}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label className={"form__label"} htmlFor="plainPassword">
                            Mot de passe
                        </label>
                        <input
                            id="plainPassword"
                            placeholder="********"
                            type="password"
                            value={props.values.plainPassword}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={props.errors.plainPassword && props.touched.plainPassword
                                ? 'form__text form__text--error'
                                : 'form__text'}
                        />
                        {props.errors.plainPassword &&
                        props.touched.plainPassword &&
                        <div className="form__error">{props.errors.plainPassword}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label className={"form__label"} htmlFor="plainPasswordVerify">
                            Confirmer le mot de passe
                        </label>
                        <input
                            id="plainPasswordConfirm"
                            placeholder="********"
                            type="password"
                            value={props.values.plainPasswordConfirm}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={
                                props.errors.plainPasswordConfirm && props.touched.plainPasswordConfirm
                                    ? 'form__text form__text--error'
                                    : 'form__text'}
                        />
                        {props.errors.plainPasswordConfirm &&
                        props.touched.plainPasswordConfirm &&
                        <div className="form__error">{props.errors.plainPasswordConfirm}</div>}
                    </div>

                    <div className={"form__input-block"}>
                        <label className={"form__label"} htmlFor="lastname">
                            Nom
                        </label>
                        <input
                            id="lastname"
                            placeholder="Dupond"
                            type="text"
                            value={props.values.lastname}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={'form__text'}
                        />
                    </div>

                    <div className={"form__input-block"}>
                        <label className={"form__label"} htmlFor="firstname">
                            Prénom
                        </label>
                        <input
                            id="firstname"
                            placeholder="Jean"
                            type="text"
                            value={props.values.firstname}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            className={'form__text'}
                        />
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
                                    <option key={jobId} value={jobId}>{jobs.entities.jobs[jobId].name}</option>
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
                        {props.editing !== "new"
                            ? <button className={"form__button form__button--red"}
                                      onClick={props.deleteUser(props.editing)} type="button">
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

class UsersForm extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSubmit(values, {setSubmitting}) {
        let changed = diff(this.initialValues, values)
        delete changed.plainPasswordConfirm
        if (this.editing !== "new") {
            apiHelpers.apiPatch("users", changed, this.editing).then(response => {
                if (response.status === 200) {
                    this.setEditing(false)()
                } else {
                    // TODO: error feedback
                    setSubmitting(false)
                }
            })
        } else {

            if (changed.plainPassword) {
                apiHelpers.apiPost("users", changed).then(response => {
                    if (response.status === 201) {
                        this.setEditing(false)()
                    } else {
                        // TODO: error feedback
                        setSubmitting(false)
                    }
                })
            } else {
                // TODO error feedback
            }
            setSubmitting(false)
        }
    }

    deleteUser(id) {
        return () => {
            apiHelpers.apiDelete("users", id).then(response => {
                this.setEditing(false)()
            })
        }
    }

    render() {

        let editingUser
        if (this.props.editing === "new") {
            editingUser = false
        } else {
            editingUser = this.props.users.entities.users[this.props.editing]
        }
        return (
            <Formik
                {...this.props}
                validationSchema={
                    object().shape({
                        email: string()
                            .email('Adresse email invalide!')
                            .required('Adresse email invalide!'),
                        plainPassword: string()
                            .min(4, "Le mot de passe doit faire au moins 4 caractères"),
                        plainPasswordConfirm: string()
                            .equalTo(ref('plainPassword'), 'Les mots de passe doivent correspondre'),
                        job: number().required("Choisisez un role")
                    })
                }
                onSubmit={this.handleSubmit}
                initialValues={{
                    email: editingUser.email,
                    lastname: editingUser.lastname,
                    firstname: editingUser.firstname,
                    job: editingUser.job ? editingUser.job : "",
                    id: editingUser.id,
                }}
                render={formikProps =>
                    <Form {...formikProps}
                          displayName={"UsersInnerForm"}
                          jobs={this.props.jobs}
                          setEditing={this.props.setEditing}
                          editing={this.props.editing}
                          deleteUser={this.deleteUser}/>
                }
            />
        )

    }
}

export default UsersForm