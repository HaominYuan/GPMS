import React, { useContext } from 'react'
import { Badge, Button, Card, Divider, Image, List, Space } from 'antd'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import style from './order.module.scss'
import Text from 'antd/lib/typography/Text';


// const data = [{
//     "information":
//     {
//         "receiver": "tstxxy", "phone": "15338755459", "address": {
//             "region": ["广东省", "广州市", "天河区"],
//             "address": "天河体育中心"
//         }, "expressCompany": "顺丰", "remark": "孟觉觉"
//     },
//     "list": [
//         { "price": 158, "title": "11枝红玫瑰+栀子叶", "img": "/static/media/0.6d5e7135.jpg", "id": 0, "number": 3 },
//         { "price": 268, "title": "19枝苏醒玫瑰+2枝粉色桔梗", "img": "/static/media/1.bdbb4833.jpg", "id": 1, "number": 2 },
//         { "price": 628, "title": "戴安娜粉玫瑰+紫色勿忘我", "img": "/static/media/3.0900c046.jpg", "id": 3, "number": 2 },
//         { "price": 378, "title": "浓33枝红玫瑰+梦幻黑纱", "img": "/static/media/2.e88520e9.jpg", "id": 2, "number": 1 }],
//     "isReceived": false,
//     "isSent": false,
//     "money": 345
// },
// {
//     "information":
//     {
//         "receiver": "tstxxy", "phone": "15338755459", "address": {
//             "region": ["广东省", "广州市", "天河区"],
//             "address": "天河体育中心"
//         }, "expressCompany": "顺丰", "remark": "孟觉觉"
//     },
//     "list": [
//         { "price": 158, "title": "11枝红玫瑰+栀子叶", "img": "/static/media/0.6d5e7135.jpg", "id": 0, "number": 3 },
//         { "price": 268, "title": "19枝苏醒玫瑰+2枝粉色桔梗", "img": "/static/media/1.bdbb4833.jpg", "id": 1, "number": 2 },
//         { "price": 628, "title": "戴安娜粉玫瑰+紫色勿忘我", "img": "/static/media/3.0900c046.jpg", "id": 3, "number": 2 },
//         { "price": 378, "title": "浓33枝红玫瑰+梦幻黑纱", "img": "/static/media/2.e88520e9.jpg", "id": 2, "number": 1 }],
//     "isReceived": false,
//     "isSent": true,
//     money: 123
// },
// {
//     "information":
//     {
//         "receiver": "tstxxy", "phone": "15338755459", "address": {
//             "region": ["广东省", "广州市", "天河区"],
//             "address": "天河体育中心"
//         }, "expressCompany": "顺丰", "remark": "孟觉觉"
//     },
//     "list": [
//         { "price": 158, "title": "11枝红玫瑰+栀子叶", "img": "/static/media/0.6d5e7135.jpg", "id": 0, "number": 3 },
//         { "price": 268, "title": "19枝苏醒玫瑰+2枝粉色桔梗", "img": "/static/media/1.bdbb4833.jpg", "id": 1, "number": 2 },
//         { "price": 628, "title": "戴安娜粉玫瑰+紫色勿忘我", "img": "/static/media/3.0900c046.jpg", "id": 3, "number": 2 },
//         { "price": 378, "title": "浓33枝红玫瑰+梦幻黑纱", "img": "/static/media/2.e88520e9.jpg", "id": 2, "number": 1 }],
//     "isReceived": true,
//     "isSent": true,
//     money: 123
// }]

const Order = observer(() => {
    const { displayStore } = useContext(RootStoreContext)

    return (
        <>
            <List
                header={<div>所有订单</div>}
                bordered
                dataSource={displayStore.orderList}

                renderItem={({ list, isReceived, isSent, money }) => (
                    <Card>
                        <div className={style.item}>
                            {list.map(({ price, title, imgUrl, key, number }) => {
                                console.log(imgUrl)
                                return (
                                    <div className={style.cartGoods} key={key}>
                                        <Badge count={number}>
                                            <Image src={imgUrl} width={100} />
                                        </Badge>
                                        <div className={style.left}>
                                            <h5 className={style.title}>{title}</h5>
                                            <div className={style.meta}>
                                                <h5>{price}元</h5>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={style.down}>
                            <Text type='danger'>总金额:  {money}</Text>
                            <div>
                                {!isSent ? <Button disabled>尚未发货</Button> : isReceived ? <Button disabled>已经收货</Button> : <Button type='primary'>确认收货</Button>}
                            </div>
                        </div>
                    </Card>
                )}
            />
        </>
    )
})

export default Order