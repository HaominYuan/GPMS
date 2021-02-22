import { useLocalObservable } from "mobx-react"

const initalValues = {
    detailVisible: false,
    flowerType: [
        {
            key: '1',
            type: '玫瑰',
            age: 32,
            description: "玫瑰"
        },
        {
            key: '2',
            type: '百合',
            age: 42,
            description: "玫瑰"
        },
        {
            key: '3',
            type: '康乃馨',
            age: 32,
            description: "玫瑰"
        },
        {
            key: '4',
            type: '郁金香',
            age: 32,
            description: "玫瑰"
        },
    ],
    editing: -1
}

const DetailContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

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
            return {type: "", description: ""}
        }
    }))

    return store
}

export default DetailContext