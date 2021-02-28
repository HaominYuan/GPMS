import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, Redirect, Route, Switch, useLocation
} from 'react-router-dom'

import "./index.scss"
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import EditableTable from './pages/edit/Edit';
import NoMatch from './pages/404/NoMatch';
import Display from './pages/display/Display';
import RootStore from './store/RootStore';
import { RootStoreContext } from './store/RootStore'
import Pay from './pages/pay/Pay';
import Order from './pages/order/Order';
import Seller from './pages/seller/Seller'

const R = () => {
    const { authStore } = useContext(RootStoreContext)
    const location = useLocation()

    return (
        <>
            { location.pathname !== "/login" && !authStore.status && <Redirect to={{ pathname: "/login", state: { referrer: location.pathname } }} />}
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/edit" component={EditableTable} />
                <Route path="/display" component={Display} />
                <Route path="/pay" component={Pay} />
                <Route path="/order" component={Order} />
                <Route path="/seller" component={Seller} />
                <Route exact path="/" component={Display} />
                <Route exact path="*" component={NoMatch} />
            </Switch>
        </>
    )
}

ReactDOM.render(
    <RootStore>
        <Router>
            <R />
        </Router>
    </RootStore>,
    document.getElementById('root')
)