import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import AppNavbar from '../navigation/AppNavbar';
import Item from "../items/Item";
import Invoice from "../invoice/Invoice";

const PrivateLayout = (props) => {
    return (
        <div>
            <AppNavbar>
                {(props.isAuthenticated || props.isLoading)? (
                        <Switch>
                            <Route exact path="/" component={Item} />
                            <Route exact path="/invoice" component={Invoice} />
                            <Route path="*" component={Item} />
                        </Switch>
                ) : (
                    <Redirect to="/app/login"/>
                )}
            </AppNavbar>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
});

export default compose(withRouter, connect(mapStateToProps, null))(PrivateLayout);
