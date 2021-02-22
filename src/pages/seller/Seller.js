import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'

const { Content, Sider } = Layout

const { SubMenu } = Menu;

const Seller = () => {

    const handleClick = e => {
        console.log('click ', e);
    }

    return (
        <>
            <Layout>
                <Sider className="site-layout-background">
                    <Menu
                        onClick={handleClick}
                        defaultSelectedKeys={['type']}
                        mode="inline"
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="flower" title="鲜花管理">
                            <Menu.Item key="type">
                                鲜花类别
                            <Link to="/seller/type" />
                            </Menu.Item>
                            <Menu.Item key="flowerlist">
                                鲜花列表
                            <Link to="/seller/name" />
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="order" title="订单管理">
                            <Menu.Item key="orderlist">
                                订单列表
                        <Link to="/seller/name" />
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            'min-height': '100vh'
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}


export default Seller