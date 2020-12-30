import React, { useContext } from 'react'
import style from './display.module.scss'
import { Input } from 'antd'
import { StoreContext } from './Display'

const { Search } = Input

const Wrapper = () => {
    const store = useContext(StoreContext)

    const onSearch = (value, event) => {
        store.setSearchText(value)
    }


    return (
        <div className={style.search}>
            <Search placeholder="Input search text" onSearch={onSearch} style={{width: "50%"}} enterButton />
        </div>
    )
}

export default Wrapper