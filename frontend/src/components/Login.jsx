import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

function Login() {
    return (
    <>
        <Formik
        initialValues={{ email: '', password: ''}}
        validate={values => {
            const errors = {};
            if (!values.email) {
            errors.email = 'Required';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = 'Email inválido';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 5) {
                errors.password = 'Contraseña debe tener más de 5 caracteres.';
            } else if (values.password.length > 20) {
                errors.password = 'Contraseña no puede tener más de 20 caracteres.';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post(`http://localhost:4000/v1/users/login`, { 
                email:values.email, 
                password:values.password 
            })
            .then(res => {
                if(res.data === 'Contraseña incorrecta.') {
                    alert('Contraseña incorrecta.')
                } else { 
                    localStorage.setItem('token', res.data)
                }
            })
            .catch((e) => {
                alert('Usuario no encontrado.')
            })
            setTimeout(() => {
                setSubmitting(false);
            }, 400);
        }}
        >
        {({ isSubmitting }) => (
            <Form>
                <Field type="email" name="email" placeholder='E-mail'/>
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" placeholder='Contraseña'/>
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                    Entrar
                </button>
            </Form>
        )}
        </Formik>
    </>
    )
}

export default Login
