import React from 'react'
import style from './display.module.scss'
import Cart from './Cart';
import Goods from './Goods';
import { Button, Layout } from 'antd'
import Search from './Search';
const { Header, Content } = Layout;

const Display = () => {
    return (
        <>
            <Layout>
                <Header style={{ background: "pink" }}>
                    <Search />

                </Header>
                <Content style={{ background: "white" }}>
                    <Goods />
                    <Cart />
                </Content>
            </Layout>
        </>
    )
}

const Wrapper = () => (
    <Display />
)

export default Wrapper