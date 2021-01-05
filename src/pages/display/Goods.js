import React, { useContext } from 'react'
import { Space, Card, Button, Image } from 'antd'
import style from './display.module.scss'
import { RootStoreContext } from '../../store/RootStore'
import { observer } from 'mobx-react'
const { Meta } = Card;

const Goods = observer(() => {
    const { flowerStore } = useContext(RootStoreContext)

    const showDrawer = (id) => {
        flowerStore.addGoods(id)
    }

    return (
        <div className={style.goods}>
            <Space>
                {flowerStore.result.map(({ price, title, img, id }) => {
                    return (
                        <Card style={{ width: 150 }}
                            cover={<Image src={img} />}
                            actions={[<Button type="primary" onClick={() => showDrawer(id)} >加入购物车</Button>]}
                            key={id}
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