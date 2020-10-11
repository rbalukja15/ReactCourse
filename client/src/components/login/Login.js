import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { FormGroup, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { login } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from "../../redux/actions/errorActions";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required('Email is required'),
    password: Yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(24, 'Password must be at max 24 characters long')
        .required('Password is required')
});

const Login = props => {

    const initialValues = { email: '', password: '' };

    const handleSubmit = values => {
        props.login(values);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div>
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <Form style={{ maxWidth: '25rem', marginTop: 'auto' }}>
                            <FormGroup>
                                <FormControl style={{ marginBottom: '2rem' }}>
                                    <InputLabel id="emailLabel">Email</InputLabel>
                                    <Input
                                        name="email"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.email}
                                    />
                                    <span style={{ color: 'red', marginTop: '0.5rem' }}>{(props.errors.email && props.touched.email) ? props.errors.email : ''}</span>
                                </FormControl>
                                <FormControl style={{ marginBottom: '2rem' }}>
                                    <InputLabel id="passwordLabel">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.password}
                                    />
                                    <span style={{ color: 'red', marginTop: '0.5rem' }}>{(props.errors.password && props.touched.password) ? props.errors.password : ''}</span>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant={'outlined'}
                                    color={'primary'}
                                    disabled={props.isSubmitting || !(props.isValid && props.dirty )}
                                >
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

Login.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
};

Login.defaultProps = {
    loggedIn: false,
    login: () => {},
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    login,
    clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
