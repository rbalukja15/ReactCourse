import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { FormGroup, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { login } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from "../../redux/actions/errorActions";

const Login = props => {
    const initialValues = { email: '', password: '' };

    const handleSubmit = values => {
        props.login(values);
    };

    return (
        <div>
            <div>
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                >
                    {(props) => (
                        <Form>
                            <FormGroup>
                                <FormControl>
                                    <InputLabel id="emailLabel">Email</InputLabel>
                                    <Input
                                        name="email"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.email}
                                    />
                                </FormControl>
                                <span style={{ color: 'red' }}>{props.errors.email ? props.errors.email : ''}</span>
                                <FormControl>
                                    <InputLabel id="passwordLabel">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.password}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant={'outlined'}
                                    color={'primary'}
                                    disabled={props.isSubmitting && !props.isValid}
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
