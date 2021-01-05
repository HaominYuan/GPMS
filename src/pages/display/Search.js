import React, { useContext } from 'react'
import style from './display.module.scss'
import { Input } from 'antd'
import { RootStoreContext } from '../../store/RootStore'

const { Search } = Input

const Wrapper = () => {
    const { flowerStore } = useContext(RootStoreContext)


    const onSearch = (value, event) => {
        flowerStore.search(value)
    }


    return (
        <div className={style.search}>
            <Search placeholder="Input search text" onSearch={onSearch} style={{width: "50%"}} enterButton />
        </div>
    )
}

export default Wrapper