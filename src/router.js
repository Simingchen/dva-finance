import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./views/IndexPage.jsx";
import Users from './views/Users.jsx';

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/users" component={Users} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
