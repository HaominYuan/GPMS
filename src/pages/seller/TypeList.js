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
    const [form] = Form.useForm()
    const [addForm] = Form.useForm()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (typeStore.detailVisible) {
            form.setFieldsValue(typeStore.getEditing())
        }
    })

    useEffect(() => {
        typeStore.getFlowerType()
    }, [])

    const handleOk = () => {
        typeStore.putFlowerType(form.getFieldValue('type'), form.getFieldValue('description'))

        typeStore.setVisible(false)
    };

    const handleCancel = () => {
        typeStore.setVisible(false)
    };

    const handleAdd = () => {
        typeStore.postFlowerType(addForm.getFieldValue('type'), addForm.getFieldValue('description'))

        setVisible(false)
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
                        typeStore.setVisible(true)
                        typeStore.setEditing(record.key)
                    }} type='primary'>
                        修改
                    </Button>
                    <Button type="primary" danger onClick={() => {
                        handleRemoveItem(record.key)
                    }}>
                        删除
                    </Button>
                </Space>
            )),
        },
    ];

    const handleRemoveItem = async (key) => {
        await typeStore.deleteFlowerType(key)
    }

    return (
        <>
            <Button type='primary' onClick={() => setVisible(true)}>新增类别</Button>
            <Table columns={columns} dataSource={typeStore.flowerType} style={{ marginTop: 20 }} />
            <Modal title="类别属性" visible={typeStore.detailVisible} onOk={handleOk} onCancel={handleCancel} width={700}>
                <Form
                    form={form}
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



            <Modal title="新增类别" visible={visible} onOk={handleAdd} onCancel={() => setVisible(false)}>
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