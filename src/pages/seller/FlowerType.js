import { Table, Space, Button } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import { RootStoreContext } from '../../store/RootStore'
import { Form, Input } from 'antd';

const trans = (text) => {
    return (
        <span style={{ display: 'table', margin: '0 auto' }}>{text}</span>
    )
}

const FlowerType = observer(() => {
    const { detailStore } = useContext(RootStoreContext)
    const [typeValue, setTypeValue] = useState();
    const [descriptionValue, setDescriptionValue] = useState()
    const [ form ] = Form.useForm()

    form.setFieldsValue(detailStore.getEditing())

    const handleOk = () => {
        detailStore.setVisible(false)
    };

    const handleCancel = () => {
        detailStore.setVisible(false)
    };

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
            title: trans('操作'),
            key: 'action',
            render: (text, record) => trans((
                <Space size="middle">
                    <Button onClick={() => { 
                        detailStore.setVisible(true)
                        detailStore.setEditing(record.key)
                    }} type='primary'>
                        修改
                    </Button>
                    <Button type="primary" danger>
                        删除
                    </Button>
                </Space>
            )),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={detailStore.flowerType} />
            <Modal title="类别属性" visible={detailStore.detailVisible} onOk={handleOk} onCancel={handleCancel} getContainer={false}>
                <Form
                    name="basic"
                    form={form}
                >
                    <Form.Item
                        label="类名"
                        name="type"
                    >
                        <Input value={typeValue} />
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                    >
                        <Input.TextArea value={descriptionValue} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

export default FlowerType