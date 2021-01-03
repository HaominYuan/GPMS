import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, Redirect, Route, Switch, useLocation
} from 'react-router-dom'

import "./index.scss"
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import EditableTable from './pages/edit/Edit';
import Nomatch from './pages/404/Nomatch';
import Display from './pages/display/Display';
import RootStore from './store/RootStore';
import  { RootStoreContext } from './store/RootStore'

const R = () => {
    const { authStore } = useContext(RootStoreContext)
    const location = useLocation()

    return (
        <>
            { location.pathname !== "/login" && !authStore.user && <Redirect to={{pathname: "/login", state: {referrer: location.pathname}}}/>}
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
        <RootStore>
            <Router>
                <R />
            </Router>
        </RootStore>
    </React.StrictMode>,
    document.getElementById('root')
);