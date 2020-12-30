import React, { useContext } from 'react'
import { Space, Card, Button, Image } from 'antd'
import img0 from '../../images/flowers/0.jpg'
import img1 from '../../images/flowers/1.jpg'
import img2 from '../../images/flowers/2.jpg'
import img3 from '../../images/flowers/3.jpg'
import { StoreContext } from './Display'
import style from './display.module.scss'
import { Observer } from 'mobx-react'
const { Meta } = Card;

const items = [
    {
        price: 158,
        title: '11枝红玫瑰+栀子叶',
        img: img0
    }, {
        price: 268,
        title: '19枝苏醒玫瑰+2枝粉色桔梗',
        img: img1
    }, {
        price: 378,
        title: '浓33枝红玫瑰+梦幻黑纱',
        img: img2
    }, {
        price: 628,
        title: '戴安娜粉玫瑰+紫色勿忘我',
        img: img3
    },

]

const Goods = () => {
    const store = useContext(StoreContext)

    const showDrawer = () => {
        store.setVisible(true)
    }

    return (
        <Observer>{() => (
            <div className={style.goods}>
                <Space>
                    {items.map(({ price, title, img }, index) => {
                        return (
                            <Card style={{ width: 150 }}
                                cover={<Image src={img} />}
                                actions={[<Button onClick={showDrawer}>加入购物车</Button>]}
                                key={index}
                            >
                                <Meta
                                    title={title}
                                    description={`${price} 元`}
                                />
                            </Card>
                        )
                    })}
                </Space>
            </div>
        )}</Observer>
    )
}

export default Goods