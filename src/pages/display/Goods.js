import React, { useContext, useEffect } from 'react'
import { Space, Card, Button, Image } from 'antd'
import style from './display.module.scss'
import { RootStoreContext } from '../../store/RootStore'
import { observer } from 'mobx-react'
const { Meta } = Card;

const Goods = observer(() => {
    const { displayStore } = useContext(RootStoreContext)

    useEffect(() => {
        displayStore.getFlowers()
    }, [])

    const showDrawer = (id) => {
        displayStore.addGoods(id)
        displayStore.setCartVisible(true)
    }

    return (
        <div className={style.goods}>
            <Space>
                {displayStore.result.map(({ price, title, imgUrl, key }) => {
                    return (
                        <Card style={{ width: 200 }}
                            cover={<Image src={imgUrl} />}
                            actions={[<Button type="primary" onClick={() => showDrawer(key)} >加入购物车</Button>]}
                            key={key}
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