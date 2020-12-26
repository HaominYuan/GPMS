import React from 'react'
import { Table, Tag, Space } from 'antd'
import style from './home.module.scss'


const dataSource = [
    {
        key: '1',
        name: "袁晓",
        college: "计算机与软件学院",
        major: "软件工程",
        title: '基于强化学习的游戏AI'
    },
    {
        key: '2',
        name: "邹天",
        college: "计算机与软件学院",
        major: "计算机科学与技术",
        title: '论文管理系统',
    },
];


const trans = (text) => {
    return (
        <span style={{ display: 'table', margin: '0 auto' }}>{text}</span>
    )
}

const columns = [
    {
        title: trans('教师'),
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: trans('学院'),
        dataIndex: 'college',
        key: 'college',
        align: 'center'
    },
    {
        title: trans('专业'),
        dataIndex: 'major',
        key: 'major',
        align: 'center'
    },
    {
        title: trans('题目'),
        dataIndex: 'title',
        key: 'title',
        align: 'center',
    },
];

const Home = () => {
    return (
        <div className={style.home}>
            <Table dataSource={dataSource} columns={columns} />
        </div>

    )
}

export default Home