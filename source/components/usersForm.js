import React from "react"
import {Link} from "react-router-dom"
import apiHelpers from "../apiHelpers"
import connectionHelpers from "../connectionHelpers"
import {string, object, ref} from 'yup'
import {Formik} from 'formik'

const Form = (props) => {

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
                className={'text-input'}
            />

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
                type="password"
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
                type="password"
                value={props.values.firstname}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={'text-input'}
            />

            <button type="submit" disabled={props.isSubmitting}>
                Go!
            </button>

        </form>
    )

}

class UsersForm extends React.Component {

    constructor(props) {
        console.log(props)
        super(props)
    }

    handleSubmit(values, {setSubmitting}) {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 100)
    }

    render() {
        // console.log(this.props)
        // let editingUser
        // if (this.props.editing === "new") {
        //     editingUser = false
        // } else {
        //     editingUser = this.props.users.entities.users[this.props.editing]
        // }
        // console.log(editingUser)
        return (
            <Formik
                {...this.props}
                validationSchema={
                    object().shape({
                        email: string()
                            .email('Adresse email invalide!')
                            .required('Adresse email invalide!'),
                        plainPasswordConfirm: string()
                            .equalTo(ref('plainPassword'), 'Les mots de passe doivent correspondre')
                    })
                }
                onSubmit={this.handleSubmit}
                // initialValues={editingUser
                //     ? {
                //         email: editingUser.email,
                //         lastname: editingUser.lastname,
                //         firstname: editingUser.firstname,
                //     }
                //     : {}}
                render={formikProps =>
                    <Form {...formikProps} displayName={"UsersInnerForm"}/>
                }
            />
        )

    }
}

export default UsersForm