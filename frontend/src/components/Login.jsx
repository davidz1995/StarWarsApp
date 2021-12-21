import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
                if(res.data.message === 'Contraseña incorrecta.') {
                    alert('Contraseña incorrecta.')
                } else { 
                    localStorage.setItem('tokenStarwarsApp', res.data.token)
                    window.location.href = '/home'
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
            <Form style={{
                display:'flex', 
                flexDirection:'column', 
                width:'30%',  
                marginTop:'8em',
                backgroundColor:'white',
                padding:'2em',
                borderRadius:'15px',
                borderStyle:'solid',
                borderWidth:'4px',
                borderColor:'black'
                }}>
                <h1 style={{marginBottom:'1em'}}>Starwars App</h1>
                <Field type="email" name="email" placeholder='E-mail' style={{marginBottom:'1em', borderRadius:'5px', borderStyle:'solid', borderWidth:'1px'}}/>
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" placeholder='Contraseña' style={{marginBottom:'1em', borderRadius:'5px', borderStyle:'solid', borderWidth:'1px'}}/>
                <ErrorMessage name="password" component="div" />
                <Button variant="outline-dark" type="submit" disabled={isSubmitting}>
                    Entrar
                </Button>
            </Form>
        )}
        </Formik>
        <Link to='/signin'>No tienes una cuenta? Registrate aca</Link>
    </>
    )
}

export default Login
