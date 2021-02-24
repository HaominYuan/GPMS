import { useLocalObservable } from "mobx-react"
import { api } from "../../api/axios-config"

const initalValues = {
    detailVisible: false,
    flowerType: [],
    editing: -1,
    isloading: false
}

const DetailContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,


        async getFlowerType() {
            store.flowerType = (await api.get('/flowertype')).data.map(({ id, ...rest }) => ({
                key: id,
                ...rest
            }))
        },

        setVisible(state) {
            store.detailVisible = state
        },

        setEditing(key) {
            store.editing = key
        },

        getEditing() {
            const { flowerType } = store
            for (let element in flowerType) {
                if (flowerType[element].key === store.editing) return flowerType[element]
            }
            return { type: "", description: "" }
        },

        async putFlowerType(type, description) {
            const { flowerType } = store
            const index = flowerType.findIndex(e => e.key === store.editing)
            flowerType[index].type = type
            flowerType[index].description = description

            await api.put("/flowertype", {
                id: store.editing,
                type,
                description
            })
        },



        async deleteFlowerType(key) {
            store.flowerType = store.flowerType.filter(e => e.key !== key)
            await api.delete('/flowertype', {
                data: {
                    id: key
                }
            })
        },

        async postFlowerType(type, description) {

            const {id, ...rest} = (await api.post("/flowertype", {
                type,
                description
            })).data

            store.flowerType.push({
                key: id,
                ...rest
            })

            store.flowerType = store.flowerType.slice()
        }
    }))

    return store
}

export default DetailContext