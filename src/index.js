import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation
} from 'react-router-dom'

import "./index.scss"
import { ProvideAuth, useAuth } from './pages/auth/Auth';
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import EditableTable from './Temp';
import Nomatch from './pages/404/Nomatch';


const R = () => {
    const { user } = useAuth()
    const location = useLocation()
    console.log(location.pathname + "  now")

    return (
        <>
            { location.pathname !== "/login" && !user && <Redirect to={{pathname: "/login", state: {referrer: location.pathname}}}/>}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/edit" component={EditableTable} />
                <Route exact path="/" component={Home} />
                <Route exact path="*" component={Nomatch} />
            </Switch>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <ProvideAuth>
            <Router>
                <R />
            </Router>
        </ProvideAuth>
    </React.StrictMode>,
    document.getElementById('root')
);