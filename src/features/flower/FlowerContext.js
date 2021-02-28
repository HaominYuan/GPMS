import { useLocalObservable } from "mobx-react"
import { api } from "../../api/axios-config"

const initalValues = {
    flowers: []
}

const FlowerContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

        getFlower(key) {
            const { flowers } = store
            const flower = flowers.find(e => e.key === key)

            return flower
        },

        async getFlowers() {
            store.flowers = (await api.get('/flowers')).data.map(({ id, ...rest }) => ({
                key: id,
                ...rest
            }))
        },

        async putFlower(key, title, price, flowerType, imgId) {
            await api.put("/flower", {
                id: key,
                price,
                title,
                flowerType: {
                    id: flowerType
                },
                imgId
            })

            Object.assign(store.getFlower(key), (await api.get('/flower', {
                params: {
                    id: key
                }
            })).data)

            store.flowers = store.flowers.slice()

        },

        async postFlower(title, price, flowerType, imgId) {
            const { id, ...rest } = (await api.post('/flower', {
                title,
                price,
                flowerType,
                imgId
            })).data

            store.flowers.push({
                key: id,
                ...rest,
            })

            store.flowers = store.flowers.slice()
        },

        async deleteFlower(key) {
            store.flowers = store.flowers.filter(e => e.key !== key)
            await api.delete('/flower', {
                data: {
                    id: key
                }
            })
        },
    }))
    return store
}

export default FlowerContext