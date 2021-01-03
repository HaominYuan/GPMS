import React, { useContext } from 'react'
import { Space, Card, Button, Image } from 'antd'
import { StoreContext } from './Display'
import style from './display.module.scss'
import { RootStoreContext } from '../../store/RootStore'
import { observer } from 'mobx-react'
const { Meta } = Card;

const Goods = observer(() => {
    const store = useContext(StoreContext)
    const { flowerStore } = useContext(RootStoreContext)

    const showDrawer = () => {
        store.setVisible(true)
    }

    return (
        <div className={style.goods}>
            <Space>
                {flowerStore.result.map(({ price, title, img }, index) => {
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
    )
})

export default Goods