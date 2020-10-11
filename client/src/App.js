import React, { Component } from 'react';
import './App.css';
//Navigation
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import PrivateLayout from "./components/layouts/PrivateLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import { createBrowserHistory } from 'history';
import {loadUser} from "./redux/actions/authActions";

const history = createBrowserHistory();

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
    return (
        <Router history={history}>
            <Provider store={store}>
                <div className="App">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" component={PrivateLayout}/>
                            <Route path="/app" component={PublicLayout}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        </Router>
    );
  }
}

export default App;
