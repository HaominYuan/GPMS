import { Image, Button, Table, Space, Form, Modal, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../store/RootStore'
import style from './seller.module.scss'

const FlowerList = observer(() => {
    const { flowerStore } = useContext(RootStoreContext)
    const [editKey, setEditKey] = useState(-1)
    const [editVisible, setEditVisible] = useState(false)
    const [editForm] = Form.useForm()

    useEffect(() => {
        flowerStore.getFlowers()
    }, [flowerStore])

    useEffect(() => {
        if (editVisible) {
            editForm.setFieldsValue(flowerStore.getFlower(editKey))
        }
    })

    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            width: "40%",
            key: 'title'
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: "20%",
            key: 'price'
        },
        {
            title: '种类',
            dataIndex: 'flowerType',
            width: "20%",
            key: 'flowerType',
            render: flowerType => <span>{flowerType.type}</span>
        },
        {
            title: '图片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            width: "20%",
            align: 'center',
            render: img => <Image src={img} width={100} />
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setEditKey(record.key)
                        setEditVisible(true)
                    }} type='primary'>
                        修改
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        handleRemoveItem(record.key)
                    }}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ]

    const handleRemoveItem = async (key) => {
        // await flowerStore.deleteFlower(key)
    }

    const handleChange = async () => {
        flowerStore.putFlower()
        setEditVisible(false)
    }

    return (
        <>
            <Button type='primary'>新增鲜花</Button>
            <Table columns={columns} dataSource={flowerStore.flowers} style={{ marginTop: 20 }} />

            <Modal title="鲜花属性" visible={editVisible} onOk={handleChange} onCancel={() => setEditVisible(false)}>
                <Form
                    form={editForm}
                >
                    <Form.Item
                        label="名称"
                        name="title"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="价格"
                        name="price"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="新增鲜花" visible={false}>
                <p>asdfasfd</p>
                <p>asdfasfd</p>
                <p>asdfasfd</p>
                <p>asdfasfd</p>
                <p>asdfasfd</p>
                <p>asdfasfd</p>
            </Modal>
        </>
    )
})

export default FlowerList