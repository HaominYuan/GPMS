import { useLocalObservable } from "mobx-react"
import { api } from "../../api/axios-config"
import img0 from '../../images/flowers/0.jpg'
import img1 from '../../images/flowers/1.jpg'
import img2 from '../../images/flowers/2.jpg'
import img3 from '../../images/flowers/3.jpg'

const imgs = [img0, img1, img2, img3]

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
            store.flowers =  (await api.get('/flower')).data.map(({ id, ...rest }) => ({
                key: id,
                ...rest
            }))

            // store.flowers = data.map((e, i) => ({
            //     ...e,
            //     img: imgs[i]
            // }))
        },

        async putFlower(key, title, price, flowerType) {
            const flower = store.getFlower(key)
            flower.price = price
            flower.title = title

            await api.put("/flower", {
                id: key,
                price,
                title,
                flowerType
            })
        },

        async postFlower(title, price, flowerType, imgUrl) {

            const {id, ...rest} = (await api.post('/flower', {
                title,
                price,
                flowerType,
            })).data

            store.flowers.push({
                key: id,
                ...rest
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