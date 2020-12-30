import React, { useContext } from 'react'
import { Drawer, } from 'antd'
import { Observer } from 'mobx-react';
import { StoreContext } from './Display'


const Cart = () => {
    const store = useContext(StoreContext)

    const onClose = () => {
        store.setVisible(false)
    };

    return <Observer>{() => (
        <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={store.visible}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )}</Observer>
}

export default Cart