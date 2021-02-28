import { useLocalObservable } from "mobx-react"
import { api } from '../../api/axios-config'

const initalValues = {
    flowers: [],
    searchText: "",
    cart: new Map(),
    cartVisible: false,
    orders: []
}

const DisplayContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

        async getFlowers() {
            store.flowers = (await api.get('/flowers')).data.map(({ id, ...rest }) => ({
                key: id,
                ...rest
            }))
        },

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

            return store.flowers.filter(e => store.cart.has(e.key)).map(e => {
                return {
                    ...e,
                    number: store.cart.get(e.key)
                }
            })
        },

        addOrder(information, list, money) {
            console.log(JSON.stringify(information))
            console.log(JSON.stringify(list))
            console.log(JSON.stringify(money))

            list.forEach(({ key }) => {
                store.cart.delete(key)
            })

            store.orders.push({
                information,
                list,
                isReceived: false,
                isSent: false,
                money
            })
        },

        get orderList() {

            return store.orders.map(order => {
                const { list } = order
                let newList = list.map(({key, number}) => {
                    return {
                        ...store.flowers[key],
                        number
                    }
                })

                // const temp = store.flowers.filter(flower => )


                return {...order, list: newList}
            })
        }
    }))

    return store
}

export default DisplayContext