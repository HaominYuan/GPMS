import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation
} from 'react-router-dom'

import "./index.scss"
import { ProvideAuth, useAuth } from './pages/auth/Auth';
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import EditableCell from './Temp';


const R = () => {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <>
            { !user && <Redirect  to={{pathname: "/login", state: {"fuck": "fuck"}}}/>}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route exact path="/" component={Home} />
                <Route path="/edit" component={EditableCell} />
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