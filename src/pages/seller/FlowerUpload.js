import { useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Upload, Modal } from "antd"

const uploadButton = (
    <div>   
        <PlusOutlined />
        <div>Upload</div>
    </div>
)

const FlowerUpload = ({ value, onChange }) => {
    const [fileList, setFileList] = useState([])
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (!value) { return }

        const newFileList = value.map(item => ({
            uid: item.id || item.uid,
            status: 'done',
            url: item.url || item.response.imgUrl,
        }))
        setFileList(newFileList)
    }, [value])

    const handleChange = ({ file, fileList }) => {

        if (file.status === 'done') {
            fileList = fileList.map(file => {
                if (file.response) {
                    file.key = file.response.id
                    console.log(file)
                }
                return file
            })
            onChange(fileList)
        }
        setFileList([...fileList])
    }

    const handlePreview = async (file) => {
        setPreviewImage(file.response.imgUrl);
        setPreviewVisible(true);
    }

    return (
        <>
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
        </>
    )
}

export default FlowerUpload