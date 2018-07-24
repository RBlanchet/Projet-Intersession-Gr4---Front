import React from "react"
import {withFormik} from 'formik'
import {string, object} from 'yup'
import {Link} from "react-router-dom"
import apiHelpers from "../helpers/apiHelpers"
import connectionHelpers from "../helpers/connectionHelpers"
import {Redirect} from "react-router-dom"

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (connectionHelpers.isAuthenticated()) {
            return (
                <Redirect to={"/dashboard"}/>
            )
        } else {
            return (
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="login" style={{display: 'block'}}>
                        Email
                    </label>
                    <input
                        id="login"
                        placeholder="jean.dupont@example.com"
                        type="text"
                        value={this.props.values.login}
                        onChange={this.props.handleChange}
                        onBlur={this.props.handleBlur}
                        className={this.props.errors.login && this.props.touched.login ? 'text-input error' : 'text-input'}
                    />
                    {this.props.errors.login &&
                    this.props.touched.login && <div className="input-feedback">{this.props.errors.login}</div>}


                    <label htmlFor="password" style={{display: 'block'}}>
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        placeholder="********"
                        type="password"
                        value={this.props.values.password}
                        onChange={this.props.handleChange}
                        onBlur={this.props.handleBlur}
                        className={this.props.errors.password && this.props.touched.password ? 'text-input error' : 'text-input'}
                    />
                    {this.props.errors.password &&
                    this.props.touched.password && <div className="input-feedback">{this.props.errors.password}</div>}

                    <button type="submit" disabled={this.props.isSubmitting}>
                        Go!
                    </button>

                    <Link to="/reset-password">Mot de passe oublié?</Link>
                </form>
            )
        }
    }
}

const LoginForm = withFormik({
    mapPropsToValues: () => ({login: '', password: ''}),
    validationSchema: object().shape({
        login: string()
            .email('Adresse email invalide!')
            .required('Adresse email invalide!'),
        password: string().required("Mot de passe requis!")
    }),
    handleSubmit: (values, {setSubmitting}) => {
        apiHelpers.apiPost("auth-tokens", values).then((response) => {

            setSubmitting(false)
            if (connectionHelpers.loginUser(response)) {
                window.location += "dashboard"
            } else {
                // TODO: error feedback
                console.log("connection failed")
                // this.errors.global = "Le couple login / mot de passe ne corresponds pas"
            }
        })
    },
    displayName: 'LoginForm', // helps with React DevTools
})(Login)

export default LoginForm