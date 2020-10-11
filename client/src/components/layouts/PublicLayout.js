import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import AppNavbar from '../navigation/AppNavbar';
import Login from "../login/Login";
const PublicLayout = (props) => {
    if (!props.isAuthenticated) {
        return (
            <div>
                <AppNavbar>
                    <Switch>
                        <Route exact path="/app/login" component={Login} />
                    </Switch>
                </AppNavbar>
            </div>
        );
    } else {
        return <Redirect to="/" />;
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default compose(withRouter, connect(mapStateToProps, null))(PublicLayout);
