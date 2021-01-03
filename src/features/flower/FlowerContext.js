
import { createContext } from "react"
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
            img: img0
        }, {
            price: 268,
            title: '19枝苏醒玫瑰+2枝粉色桔梗',
            img: img1,
        }, {
            price: 378,
            title: '浓33枝红玫瑰+梦幻黑纱',
            img: img2,
        }, {
            price: 628,
            title: '戴安娜粉玫瑰+紫色勿忘我',
            img: img3,
        },
    ],
    searchText: "",
}

const FlowerContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

        search(text) {
            store.searchText = text
        },

        get result() {
            return store.flowers.filter((element) => {
                return element.title.search(store.searchText) !== -1
            })
        }
    }))
    
    return store
}

export default FlowerContext