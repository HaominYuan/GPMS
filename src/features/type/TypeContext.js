import { useLocalObservable } from "mobx-react"
import { api } from "../../api/axios-config"

const initalValues = {
    flowerTypes: [],
}

const TypeContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,


        getFlowerType(key) {
            const { flowerTypes } = store
            return flowerTypes.find(e => e.key === key)
        },

        async getFlowerTypes() {
            store.flowerTypes = (await api.get('/flowertype')).data.map(({ id, ...rest }) => ({
                key: id,
                ...rest
            }))

        },

        async postFlowerType(type, description) {

            const {id, ...rest} = (await api.post("/flowertype", {
                type,
                description
            })).data

            store.flowerTypes.push({
                key: id,
                ...rest
            })

            store.flowerTypes = store.flowerTypes.slice()
        },

        async putFlowerType(key, type, description) {
            const flowerType = store.getFlowerType(key)

            flowerType.type = type
            flowerType.description = description

            await api.put("/flowertype", {
                id: key,
                type,
                description
            })
        },

        async deleteFlowerType(key) {
            store.flowerTypes = store.flowerTypes.filter(e => e.key !== key)
            await api.delete('/flowertype', {
                data: {
                    id: key
                }
            })
        },
    }))

    return store
}

export default TypeContext