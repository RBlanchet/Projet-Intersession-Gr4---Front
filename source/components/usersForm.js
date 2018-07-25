import React from "react"
import {string, object, number, ref} from 'yup'
import {Formik} from 'formik'
import {diff} from 'deep-object-diff'
import apiHelpers from "../helpers/apiHelpers"

const Form = (props) => {
    const jobs = props.jobs
    return (
        <form onSubmit={props.handleSubmit}>

            <label htmlFor="email" style={{display: 'block'}}>
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
                    ? 'text-input error'
                    : 'text-input'}
            />
            {props.errors.email &&
            props.touched.email && <div className="input-feedback">{props.errors.email}</div>}


            <label htmlFor="plainPassword" style={{display: 'block'}}>
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
                    ? 'text-input error'
                    : 'text-input'}
            />
            {props.errors.plainPassword &&
            props.touched.plainPassword &&
            <div className="input-feedback">{props.errors.plainPassword}</div>}

            <label htmlFor="plainPasswordVerify" style={{display: 'block'}}>
                Confirmer le mot de passe
            </label>
            <input
                id="plainPasswordConfirm"
                placeholder="********"
                type="password"
                value={props.values.plainPasswordConfirm}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={props.errors.plainPasswordConfirm && props.touched.plainPasswordConfirm
                    ? 'text-input error'
                    : 'text-input'}
            />
            {props.errors.plainPasswordConfirm &&
            props.touched.plainPasswordConfirm &&
            <div className="input-feedback">{props.errors.plainPasswordConfirm}</div>}

            <label htmlFor="lastname" style={{display: 'block'}}>
                Nom
            </label>
            <input
                id="lastname"
                placeholder="Dupond"
                type="text"
                value={props.values.lastname}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={'text-input'}
            />

            <label htmlFor="firstname" style={{display: 'block'}}>
                Prénom
            </label>
            <input
                id="firstname"
                placeholder="Jean"
                type="text"
                value={props.values.firstname}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={'text-input'}
            />

            <select
                name="job"
                value={props.values.job}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={'select'}>

                <option value="" disabled={true}>Rôle</option>
                {jobs.result.map(jobId => (
                    <option key={jobId} value={jobId}>{jobs.entities.jobs[jobId].name}</option>
                ))}

            </select>
            {props.errors.job &&
            props.touched.job &&
            <div className="input-feedback">{props.errors.job}</div>}

            <button type="submit" disabled={props.isSubmitting}>
                Go!
            </button>

        </form>
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
                console.log(changed)
                apiHelpers.apiPost("users", changed).then(response => {
                    console.log(response)
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
        console.log(this)
        return () => {
            apiHelpers.apiDelete("users", id).then(response => {
                console.log(response)
                // TODO: feedback
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
            <div>
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
                        <Form {...formikProps} displayName={"UsersInnerForm"} jobs={this.props.jobs}/>
                    }
                />
                <button onClick={this.props.setEditing(false)}>
                    X
                </button>
                {this.props.editing !== "new"
                    ? <button onClick={this.deleteUser(editingUser.id)}>Supprimer</button>
                    : ""}
                <hr/>
            </div>
        )

    }
}

export default UsersForm