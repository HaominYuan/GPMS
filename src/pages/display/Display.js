import React from 'react'
import style from './display.module.scss'
import { useLocalObservable } from 'mobx-react-lite'
import Cart from './Cart';
import Goods from './Goods';
import { Layout } from 'antd'
import Search from './Search';
const { Header, Content } = Layout;
export const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        visible: false,
        setVisible: (visible) => { store.visible = visible },
        searchText: "",
        setSearchText: (text) => {store.searchText = text}
    }))

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

const Display = () => {
    return (
        <Layout>
            <Header style={{background: "pink"}}>
                <Search />
            </Header>
            <Content style={{background: "white"}}>
                <Goods />
                <Cart />
            </Content>

        </Layout>
    )
}

const Wrapper = () => (
    <StoreProvider>
        <Display />
    </StoreProvider>
)

export default Wrapper