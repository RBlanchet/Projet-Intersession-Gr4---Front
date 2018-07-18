import React from "react"
import {withFormik} from 'formik'
import {string, object} from 'yup'
import {Link} from "react-router-dom"
import apiHelpers from "../apiHelpers"

class Login extends React.Component {
    constructor(props) {
        super(props)
        apiHelpers.apiGet("login-generate-token").then(token => {
            this.props.values._csrf_token = token.data
        })
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="_username" style={{display: 'block'}}>
                    Email
                </label>
                <input
                    id="_username"
                    placeholder="jean.dupont@example.com"
                    type="text"
                    value={this.props.values._username}
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    className={this.props.errors._username && this.props.touched._username ? 'text-input error' : 'text-input'}
                />
                {this.props.errors._username &&
                this.props.touched._username && <div className="input-feedback">{this.props.errors._username}</div>}


                <label htmlFor="_password" style={{display: 'block'}}>
                    Mot de passe
                </label>
                <input
                    id="_password"
                    placeholder="********"
                    type="password"
                    value={this.props.values._password}
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    className={this.props.errors._password && this.props.touched._password ? 'text-input error' : 'text-input'}
                />
                {this.props.errors._password &&
                this.props.touched._password && <div className="input-feedback">{this.props.errors._password}</div>}

                <label htmlFor="_remember_me" style={{display: 'block'}}>
                    Se souvenir de moi
                </label>
                <input
                    id="_remember_me"
                    type="checkbox"
                    value={"on"}
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    className={'checkbox-input'}
                />

                <button type="submit" disabled={this.props.isSubmitting}>
                    Go!
                </button>

                <Link to="/reset-password">Mot de passe oublié?</Link>
            </form>
        )
    }
}

const LoginForm = withFormik({
    mapPropsToValues: () => ({_username: '', _password: ''}),
    validationSchema: object().shape({
        _username: string()
            .email('Adresse email invalide!')
            .required('Adresse email invalide!'),
        _password: string().required("Mot de passe requis!")
    }),
    handleSubmit: (values, {setSubmitting}) => {
        apiHelpers.apiPost("login_check", values).then(response => {
            debugger
            setSubmitting(false)
        })
    },
    displayName: 'LoginForm', // helps with React DevTools
})(Login)

export default LoginForm