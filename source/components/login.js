import React from "react"
import {withFormik} from 'formik'
import {string, object} from 'yup'
import {Link} from "react-router-dom"
import apiHelpers from "../apiHelpers"

class Login extends React.Component {
    constructor(props) {
        super(props)
        apiHelpers.apiGet("login-generate-token").then(token => {
            this.props.values.csrf_token = token.data
        })
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="email" style={{display: 'block'}}>
                    Email
                </label>
                <input
                    id="email"
                    placeholder="jean.dupont@example.com"
                    type="text"
                    value={this.props.values.email}
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    className={this.props.errors.email && this.props.touched.email ? 'text-input error' : 'text-input'}
                />
                {this.props.errors.email &&
                this.props.touched.email && <div className="input-feedback">{this.props.errors.email}</div>}


                <label htmlFor="password" style={{display: 'block'}}>
                    Mot de passe
                </label>
                <input
                    id="password"
                    placeholder="Mot de passe"
                    type="password"
                    value={this.props.values.password}
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleBlur}
                    className={this.props.errors.password && this.props.touched.password ? 'text-input error' : 'text-input'}
                />
                {this.props.errors.password &&
                this.props.touched.password && <div className="input-feedback">{this.props.errors.password}</div>}

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

                <Link to="/reset-password">Forgot your password?</Link>
            </form>
        )
    }
}

const LoginForm = withFormik({
    mapPropsToValues: () => ({email: '', password: ''}),
    validationSchema: object().shape({
        email: string()
            .email('Adresse email invalide!')
            .required('Adresse email invalide!'),
        password: string().required("Mot de passe requis!")
    }),
    handleSubmit: (values, {setSubmitting}) => {
        debugger
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
        // TODO: Actually log people in
    },
    displayName: 'LoginForm', // helps with React DevTools
})(Login)

export default LoginForm