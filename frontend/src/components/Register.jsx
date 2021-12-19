import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Register() {

    return (
    <>
        <Formik
        initialValues={{ email: '', password: '', passwordConfirm: '', }}
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
            if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Required';
            } else if (values.passwordConfirm !== values.password ) {
                errors.passwordConfirm = 'Contraseña no coincide.';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post(`http://localhost:4000/v1/users`, { 
                mail:values.email, 
                password:values.passwordConfirm 
            })
            .then(res => {
                alert(res.data);
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
                <Field type="password" name="passwordConfirm" placeholder='Confirma contraseña'/>
                <ErrorMessage name="passwordConfirm" component="div" />
                <button type="submit" disabled={isSubmitting}>
                    Registrate
                </button>
            </Form>
        )}
        </Formik>
        <Link to='/login'>Tienes una cuenta entra aca</Link>
    </>
    )
}

export default Register