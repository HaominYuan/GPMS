import { useLocalObservable } from "mobx-react"
import img0 from '../../images/flowers/0.jpg'
import img1 from '../../images/flowers/1.jpg'
import img2 from '../../images/flowers/2.jpg'
import img3 from '../../images/flowers/3.jpg'

import { api } from "../../api/axios-config"

const initalValues = {
    flowers: [{
        price: 158,
        title: '11枝红玫瑰+栀子叶',
        img: img0,
        id: 0
    }, {
        price: 268,
        title: '19枝苏醒玫瑰+2枝粉色桔梗',
        img: img1,
        id: 1
    }, {
        price: 378,
        title: '浓33枝红玫瑰+梦幻黑纱',
        img: img2,
        id: 2
    }, {
        price: 628,
        title: '戴安娜粉玫瑰+紫色勿忘我',
        img: img3,
        id: 3
    },
    ],
    searchText: "",
    cart: new Map(),
    cartVisible: false,
    order: []
}

console.log(img0, img1, img2, img3)

const DisplayContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

        search(text) {
            store.searchText = text
        },

        get result() {
            return store.flowers.filter((element) => {
                return element.title.search(store.searchText) !== -1
            })
        },

        setCartVisible(state) {
            store.cartVisible = state
        },

        addGoods(id) {
            let count = store.cart.get(id)
            count = count ? count + 1 : 1
            store.cart.set(id, count)
        },

        minusGoods(id) {
            let count = store.cart.get(id)
            if (!count) return
            count = count - 1
            if (count === 0) {
                store.cart.delete(id)
            } else {
                store.cart.set(id, count)
            }
        },

        get cartGoods() {
            const result = []
            store.cart.forEach((value, key) => {
                result.push(
                    {
                        ...store.flowers[key],
                        number: value,
                        key
                    }
                )
            });

            return result
        },

        addOrder(information, list, money) {

            list.forEach(({ id }) => {
                store.cart.delete(id)
            })

            store.order.push({
                information,
                list,
                isReceived: false,
                isSent: false,
                money
            })
        },

        get orderList() {
            return store.order.map(value => {
                const { list } = value
                let newList = list.map(({id, number}) => {
                    return {
                        ...store.flowers[id],
                        number
                    }
                })
                return {...value, list: newList}
            })
        }
    }))

    return store
}

export default DisplayContext