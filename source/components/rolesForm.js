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

                    <div className={"form__buttons"}>
                        <button className={"form__button"} type="submit" disabled={props.isSubmitting}>
                            Valider
                        </button>
                        {props.editing !== "new"
                            ? <button className={"form__button form__button--red"}
                                      onClick={props.deleteRole(props.editing)} type="button">
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

class RolesForm extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSubmit(values, {setSubmitting}) {
        let changed = diff(this.initialValues, values)
        if (changed.cost) {
            changed.cost = parseFloat(changed.cost)
        }
        console.log(changed, this.editing)
        if (this.editing !== "new") {
            apiHelpers.apiPatch("roles", changed, this.editing).then(response => {
                if (response.status === 200) {
                    this.setEditing(false)()
                } else {
                    // TODO: error feedback
                    setSubmitting(false)
                }
            })
        } else {

            if (changed.plainPassword) {
                apiHelpers.apiPost("roles", changed).then(response => {
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

    deleteRole(id) {
        return () => {
            apiHelpers.apiDelete("roles", id).then(response => {
                this.setEditing(false)()
            })
        }
    }

    render() {

        let editingRole
        if (this.props.editing === "new") {
            editingRole = false
        } else {
            editingRole = this.props.roles.entities.roles[this.props.editing]
        }
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
                }}
                render={formikProps =>
                    <Form {...formikProps}
                          displayName={"RolesInnerForm"}
                          jobs={this.props.jobs}
                          setEditing={this.props.setEditing}
                          editing={this.props.editing}
                          deleteRole={this.deleteRole}/>
                }
            />
        )

    }
}

export default RolesForm