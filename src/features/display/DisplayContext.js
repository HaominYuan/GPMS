import { useLocalObservable } from "mobx-react"

const initalValues = {
    flowers: [],
    searchText: "",
    cart: new Map(),
    cartVisible: false,
    order: []
}

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