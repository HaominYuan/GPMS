import { Image, Button, Table, Space, Form, Modal, Input, Cascader, InputNumber } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../store/RootStore'
import style from './seller.module.scss'
import FlowerUpload from './FlowerUpload'

const FlowerList = observer(() => {
    const { flowerStore, typeStore } = useContext(RootStoreContext)
    const [editVisible, setEditVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false)
    const [editForm] = Form.useForm()
    const [addForm] = Form.useForm()
    const [editKey, setEditKey] = useState(-1)
    const [options, setOptions] = useState()

    useEffect(() => {
        typeStore.getFlowerTypes()
        const result = typeStore.flowerTypes.map(({ key, type }) => ({
            label: type,
            value: key
        }))
        setOptions(result)
    }, [])

    useEffect(() => {
        flowerStore.getFlowers()
    }, [flowerStore])

    useEffect(() => {
        if (!editVisible) { return }
        const temp = flowerStore.getFlower(editKey)

        editForm.setFieldsValue({
            ...temp,
            flowerType: [
                temp.flowerType.id
            ],
            img: [
                {
                    status: 'done',
                    url: temp.imgUrl,
                },
            ]
        })
    })

    useEffect(() => {
        if (!addVisible && !editVisible) { return }
        typeStore.getFlowerTypes()
        const result = typeStore.flowerTypes.map(({ key, type }) => ({
            label: type,
            value: key
        }))
        setOptions(result)
    }, [addVisible, editVisible])

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
            render: flowerType => {
                return (
                    <span>{flowerType.type}</span>
                )
            }
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
                        handleRemoveFlower(record.key)
                    }}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ]

    const handleAddFlower = async () => {
        await flowerStore.postFlower(addForm.getFieldValue('title'), addForm.getFieldValue('price'), { id: addForm.getFieldValue('flowerType')[0] }, addForm.getFieldValue('img')[0].response.id)
        addForm.setFieldsValue({})
        setAddVisible(false)

    }

    const handleRemoveFlower = async (key) => {
        await flowerStore.deleteFlower(key)
    }

    const handleEditFlower = async () => {
        await flowerStore.putFlower(editKey, editForm.getFieldValue('title'), editForm.getFieldValue('price'), editForm.getFieldValue('flowerType')[0], editForm.getFieldValue('img')[0].response.id)
        setEditVisible(false)
    }

    return (
        <>
            <Button type='primary' onClick={() => setAddVisible(true)}>新增鲜花</Button>
            <Table columns={columns} dataSource={flowerStore.flowers} style={{ marginTop: 20 }} />

            <Modal title="鲜花属性" visible={editVisible} onOk={handleEditFlower} onCancel={() => setEditVisible(false)}>
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
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="类别"
                        name="flowerType"
                    >
                        <Cascader options={options} placeholder="" />
                    </Form.Item>

                    <Form.Item
                        label="图片"
                        name="img"
                    >
                        <FlowerUpload />
                    </Form.Item>

                </Form>
            </Modal>
            <Modal title="新增鲜花" visible={addVisible} onOk={handleAddFlower} onCancel={() => setAddVisible(false)}>
                <Form
                    form={addForm}
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
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="类别"
                        name="flowerType"
                    >
                        <Cascader options={options} placeholder="" />
                    </Form.Item>

                    <Form.Item
                        label="图片"
                        name="img"
                    >
                        <FlowerUpload />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

export default FlowerList