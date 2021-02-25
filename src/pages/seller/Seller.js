import { Menu } from 'antd'
import { Link, Route, useLocation, useRouteMatch } from 'react-router-dom'
import { Layout } from 'antd'
import { observer } from 'mobx-react';
import FlowerList from './FlowerList';
import FlowerType from './TypeList';
import OrderList from './OrderList';
import { useEffect } from 'react';

const { Content, Sider } = Layout
const { SubMenu } = Menu;

const Seller = observer(() => {
    const { path, url } = useRouteMatch()
    const location = useLocation()

    const handleClick = () => {
        console.log('here')
    }

    return (
        <>
            <Layout>
                <Sider width={250}>
                    <Menu
                        defaultSelectedKeys={['flowertype']}
                        defaultOpenKeys={['flower']}
                        // selectedKeys={[location.pathname]}
                        // openKeys={[location.pathname.split('/').slice(0, 2).join('/')]}
                        mode="inline"
                        style={{ height: '100%' }}
                        onClick={handleClick}
                    >
                        <SubMenu key="flower" title="鲜花管理">
                            <Menu.Item key="flowertype">
                                鲜花类别
                                <Link to={`${url}/flowertype`} />
                            </Menu.Item>
                            <Menu.Item key="flowerlist">
                                鲜花列表
                                <Link to={`${url}/flowerlist`} />
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="order" title="订单管理">
                            <Menu.Item key="orderlist">
                                订单列表
                                <Link to={`${url}/orderlist`} />
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            'minHeight': '100vh',
                            background: 'white'
                        }}
                    >
                        <Route path={`${path}/flowerlist`} component={FlowerList} />
                        <Route path={`${path}/flowertype`} component={FlowerType} />
                        <Route path={`${path}/orderlist`} component={OrderList} />
                        <Route exact path={`${path}`} component={FlowerType} />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
})


export default Seller