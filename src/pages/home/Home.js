import React, { useEffect, useState } from 'react'
import { Form, Upload } from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import Modal from 'antd/lib/modal/Modal';
import style from './home.module.scss'

const Home = () => {
    const [form] = Form.useForm()

    return (
        <Form
            form={form}
            initialValues={
                {
                    'uploadPhoto': []
                }
            }
        >
            <Form.Item name="uploadPhoto">
                <UploadComponent />
            </Form.Item>
        </Form>
    )
}

const UploadComponent = ({ value, onChange }) => {
    const [fileList, setFileList] = useState([])
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div>Upload</div>
        </div>
    )

    useEffect(() => {
        if (!value) { return }
        let newFileList = value.map(item => ({
            uid: item.id || item.uid,
            status: 'done',
            url: '/static/media/0.6d5e7135.jpg',
            imgUrl: item.imgUrl
        }))
        setFileList(newFileList)
    }, [value])

    const triggerChange = (v) => {
        if (!onChange) { return }
        onChange(v)
    }

    const handleChange = ({ file, fileList }) => {
        fileList = fileList.map((f) => {
            if (f.response) {
                f.id = f.uid;
                console.log(f.response.data)
                // file.imgUrl = file.response.data.key
            }
            return f;
        })
        if (file.status !== undefined) {
            if (file.status === 'done') {
                console.log('上传成功')
                triggerChange(fileList);
            } else if (file.status === 'error') {
                console.log('上传失败')
            } else if (file.status === 'removed') {
                if (typeof file.uid === 'number') {
                    //请求接口，删除已经保存过的图片，并且成功之后triggerChange
                    triggerChange(fileList);
                } else {
                    //只是上传到了服务器，并没有保存，直接riggerChange
                    triggerChange(fileList);
                }
            }
        }
        setFileList([...fileList]);
    }

    const handlePreview = async (file) => {
        setPreviewImage(`url/${file.imgUrl}`);
        setPreviewVisible(true);
    };

    return (
        <div>
            <Upload
                name="flower"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                onPreview={handlePreview}
                action={'/flowerimg'}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title='预览照片'
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
};

export default Home