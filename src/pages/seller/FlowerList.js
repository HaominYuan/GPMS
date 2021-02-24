import { Image, Button, Table, Space, Form, Modal, Input, Cascader, Upload, InputNumber } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../store/RootStore'
import style from './seller.module.scss'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

const FlowerList = observer(() => {
    const { flowerStore, typeStore } = useContext(RootStoreContext)
    const [editVisible, setEditVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false)
    const [editForm] = Form.useForm()
    const [addForm] = Form.useForm()
    const [editKey, setEditKey] = useState(-1)
    const [options, setOptions] = useState()
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState()

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
        editForm.setFieldsValue(flowerStore.getFlower(editKey))
    })

    useEffect(() => {
        if (!addVisible) { return }
        typeStore.getFlowerTypes()
        const result = typeStore.flowerTypes.map(({ key, type }) => ({
            label: type,
            value: key
        }))
        setOptions(result)
    }, [addVisible])

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
        await flowerStore.postFlower(addForm.getFieldValue('title'), addForm.getFieldValue('price'), { id: addForm.getFieldValue('flowerType')[0] })

        setAddVisible(false)
    }

    const handleRemoveFlower = async (key) => {
        await flowerStore.deleteFlower(key)
    }

    const handleEditFlower = async () => {

        await flowerStore.putFlower(editKey, editForm.getFieldValue('title'), editForm.getFieldValue('price'))
        setEditVisible(false)
    }

    const handleUploadChange = async info => {

        console.log(info)


        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imgUrl => {
                setLoading(false)
                console.log(imgUrl)
                setImgUrl(imgUrl)
            })
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };


    const beforeUpload = (file, fileList) => {
        return false
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
                        <InputNumber width={"100%"} size={"large"} />
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
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="flower"
                            listType="picture-card"
                            showUploadList={false}
                            // action="/flowerimg"
                        >
                            {imgUrl ? <img src={imgUrl} alt="img" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

export default FlowerList