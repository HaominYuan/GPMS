import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, Route, Switch, useLocation
} from 'react-router-dom'

import "./index.scss"
import { ProvideAuth, useAuth } from './pages/auth/Auth';
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import EditableTable from './pages/edit/Edit';
import Nomatch from './pages/404/Nomatch';
import Display from './pages/display/Display';


const R = () => {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <>
            {/* { location.pathname !== "/login" && !user && <Redirect to={{pathname: "/login", state: {referrer: location.pathname}}}/>} */}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/edit" component={EditableTable} />
                <Route path="/display" component={Display} />
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