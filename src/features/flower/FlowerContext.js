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

// [{ "createTime": 1614084121000, "deleted": 0, "key": 1, "imgUrl": "", "price": 268, "title": "11枝红玫瑰+栀子叶", img: img0}, 
//             { "createTime": 1614084121000, "deleted": 0, "key": 2, "imgUrl": "", "price": 158, "title": "19枝苏醒玫瑰+2枝粉色桔梗", img: img1  }, 
//             { "createTime": 1614084121000, "deleted": 0, "key": 3, "imgUrl": "", "price": 268, "title": "11枝红玫瑰+栀子叶", img: img2  }, 
//             { "createTime": 1614084121000, "deleted": 0, "key": 4, "imgUrl": "", "price": 299, "title": "戴安娜粉玫瑰+紫色勿忘我", img: img3  }]



const FlowerContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

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

        async putFlower(type, description) {
            // const { flowerType } = store
            // const index = flowerType.findIndex(e => e.key === store.editing)
            // flowerType[index].type = type
            // flowerType[index].description = description

            // await api.put("/flowertype", {
            //     id: store.editing,
            //     type,
            //     description
            // })
        },

        getFlower(key) {
            const { flowers } = store
            const flower = flowers.find(e => e.key === key)
            console.log(JSON.stringify(flower))
            return flower
        }

    }))
    return store
}

export default FlowerContext