import React, { useContext } from 'react'
import { Badge, Button, Drawer, Image, } from 'antd'
import { RootStoreContext } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import style from './display.module.scss'
import ButtonGroup from 'antd/lib/button/button-group';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';


const Cart = observer(() => {
    const { flowerStore } = useContext(RootStoreContext)
    const history = useHistory()

    const onClose = () => {
        flowerStore.setCartVisible(false)
    };

    const open = () => {
        flowerStore.setCartVisible(true)
    }

    const decline = (id) => {
        flowerStore.minusGoods(id)
    }

    const increase = (id) => {
        flowerStore.addGoods(id)
    }

    const toPay = () => {
        history.push("/pay")
    }


    return (

        <>
            <Drawer
                title="购物车"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={flowerStore.cartVisible}
                bodyStyle={{ display: 'flex', flexDirection: 'column' }}
                mask={false}
                closable={true}
            >
                {flowerStore.cartGoods.map(({ price, title, img, id, number }) => {
                    return (
                        <div className={style.cartGoods} key={id}>
                            <Badge count={number}>
                                <Image src={img} width={80} />
                            </Badge>
                            <div className={style.left}>
                                <h5 className={style.title}>{title}</h5>
                                <div className={style.meta}>
                                    <h5>{price}元</h5>
                                    <ButtonGroup>
                                        <Button onClick={() => decline(id)} size={'small'}>
                                            <MinusOutlined />
                                        </Button>
                                        <Button onClick={() => increase(id)} size={'small'}>
                                            <PlusOutlined />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Button className={style.button} type="primary" onClick={toPay}>结账</Button>
            </Drawer>
            <Button className={style.cart} onClick={open}>购物车</Button>
        </>
    )
})

export default Cart