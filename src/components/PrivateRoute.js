import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import NotFound from "./NotFound";
const PrivateRoute = (props) => {
    return (
        localStorage.getItem("pass") ?
            <Route component={props.component} path={props.path} exact={props.exact}/>
            : <Route component={NotFound}/>
    );
};

export default PrivateRoute;