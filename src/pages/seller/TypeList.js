import { Table, Space, Button } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../../store/RootStore'
import { Form, Input } from 'antd';

const trans = (text) => {
    return (
        <span style={{ display: 'table', margin: '0 auto' }}>{text}</span>
    )
}

const TypeList = observer(() => {
    const { typeStore } = useContext(RootStoreContext)
    const [editForm] = Form.useForm()
    const [addForm] = Form.useForm()
    const [addVisible, setAddVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [editKey, setEditKey] = useState(-1)

    useEffect(() => {
        typeStore.getFlowerTypes()
    }, [typeStore])


    useEffect(() => {
        if (editVisible) {
            editForm.setFieldsValue(typeStore.getFlowerType(editKey))
        }
    })

    const handleRemoveType = async (key) => {
        await typeStore.deleteFlowerType(key)
    }

    const columns = [
        {
            title: '类名',
            dataIndex: 'type',
            key: 'type',
            width: '10%'
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width: '70%'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => trans((
                <Space size="middle">
                    <Button onClick={() => {
                        setEditKey(record.key)
                        setEditVisible(true)
                    }} type='primary'>
                        修改
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        handleRemoveType(record.key)
                    }}>
                        删除
                    </Button>
                </Space>
            )),
        },
    ]

    const handleAddType = async () => {
        await typeStore.postFlowerType(addForm.getFieldValue('type'), addForm.getFieldValue('description'))

        setAddVisible(false)
    }

    const handleEditType = async () => {
        await typeStore.putFlowerType(editKey, editForm.getFieldValue('type'), editForm.getFieldValue('description'))

        setEditVisible(false)
    }

    return (
        <>
            <Button type='primary' onClick={() => setAddVisible(true)}>新增类别</Button>
            <Table columns={columns} dataSource={typeStore.flowerTypes} style={{ marginTop: 20 }} />
            <Modal title="类别属性" visible={editVisible} onOk={handleEditType} onCancel={() => setEditVisible(false)} width={700}>
                <Form
                    form={editForm}
                >
                    <Form.Item
                        label="类名"
                        name="type"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="新增类别" visible={addVisible} onOk={handleAddType} onCancel={() => setAddVisible(false)}>
                <Form
                    form={addForm}
                >
                    <Form.Item
                        label="类名"
                        name="type"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

export default TypeList