import React from "react"
import {withFormik} from 'formik'
import {string, object} from 'yup'
import {Link} from "react-router-dom"

const Login = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{display: 'block'}}>
                Email
            </label>
            <input
                id="email"
                placeholder="jean.dupont@example.com"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? 'text-input error' : 'text-input'}
            />
            {errors.email &&
            touched.email && <div className="input-feedback">{errors.email}</div>}


            <label htmlFor="password" style={{display: 'block'}}>
                Mot de passe
            </label>
            <input
                id="password"
                placeholder="Mot de passe"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password ? 'text-input error' : 'text-input'}
            />
            {errors.password &&
            touched.password && <div className="input-feedback">{errors.password}</div>}

            <button type="submit" disabled={isSubmitting}>
                Go!
            </button>

            <Link to="/reset-password">Forgot your password?</Link>
        </form>
    )
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
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
            // TODO: Actually log people in
        }, 1000)
    },
    displayName: 'LoginForm', // helps with React DevTools
})(Login)

export default LoginForm