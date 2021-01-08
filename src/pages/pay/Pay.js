import { observer } from "mobx-react"
import React, { useContext, useEffect, useState } from 'react';
import { Button, Cascader, Input, Select, Table, Form, Modal } from 'antd';
import { RootStoreContext } from "../../store/RootStore";
import Text from "antd/lib/typography/Text";
import style from './pay.module.scss'
import QRCode from 'qrcode.react'
import { useHistory } from "react-router-dom";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (text) => <span>{text}</span>,
        key: 'id'
    },
    {
        title: '商品',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '个数',

        dataIndex: 'number',
        key: 'number'
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
    }

];

const residences = [
    {
        value: '广东省',
        label: '广东省',
        children: [
            {
                value: '广州市',
                label: '广州市',
                children: [
                    {
                        value: '天河区',
                        label: '天河区',
                    },
                    {
                        value: '越秀区',
                        label: '越秀区',
                    },
                ],
            },
            {
                value: '深圳市',
                label: '深圳市',
                children: [
                    {
                        value: '南山区',
                        label: '南山区',
                    },
                    {
                        value: '福田区',
                        label: '福田区',
                    },
                ],
            },
        ],
    },
    {
        value: '福建省',
        label: '福建省',
        children: [
            {
                value: '厦门市',
                label: '厦门市',
                children: [
                    {
                        value: '集美区',
                        label: '集美区',
                    },
                ],
            },
        ],
    },
];

// const data = [{ "price": 378, "title": "浓33枝红玫瑰+梦幻黑纱", "img": "/static/media/2.e88520e9.jpg", "id": 2, "number": 3, "key": 2 },
// { "price": 268, "title": "19枝苏醒玫瑰+2枝粉色桔梗", "img": "/static/media/1.bdbb4833.jpg", "id": 1, "number": 2, "key": 1 }]

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Pay = observer(() => {
    const { flowerStore } = useContext(RootStoreContext)
    const [money, setMoney] = useState(0)
    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)
    const [information, setInformation] = useState({})
    const history = useHistory()

    const tableChange = (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // console.log(JSON.stringify(selectedRows))

        setList(selectedRows.map(value => {
            return {
                id: value.key,
                number: value.number
            }
        }))

        setMoney(selectedRows.reduce((total, current) => {
            return total + current.number * current.price
        }, 0))
    }

    const onFinish = values => {
        // console.log(JSON.stringify(values))
        setInformation(values)
        // console.log(JSON.stringify(list))
        setVisible(true)
    }

    const toOrder = () => {
        history.push('/order')
    }

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false)
                flowerStore.addOrder(information, list, money)
            }, 3000)
        }
    }, [visible])

    return (
        <>
            <div className={style.pay}>
                <Table
                    rowSelection={{
                        onChange: tableChange,
                    }}
                    columns={columns}
                    dataSource={flowerStore.cartGoods}
                    pagination={false}
                    summary={() => {
                        return <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={5}><span style={{ display: 'table', margin: '0 auto' }}><Text type="danger">总金额：{money}</Text></span></Table.Summary.Cell>
                        </Table.Summary.Row>
                    }}
                />
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="收货人"
                        name="receiver"
                    >
                        <Input style={{ width: '65%' }} />
                    </Form.Item>

                    <Form.Item
                        label="电话号码"
                        name="phone"
                    >
                        <Input style={{ width: '65%' }} />
                    </Form.Item>

                    <Form.Item
                        label="地址"
                    >
                        <Input.Group compact>
                            <Form.Item
                                name={['address', 'region']}
                                noStyle
                            >
                                <Cascader placeholder="所在地区" options={residences} style={{ width: '25%' }} />
                            </Form.Item>
                            <Form.Item
                                name={['address', 'address']}
                                noStyle
                            >
                                <Input placeholder="详细地址" style={{ width: '40%' }} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        label="物流"
                        name="expressCompany"
                    >
                        <Select style={{ width: 100 }} >
                            <Select.Option value="顺丰">顺丰</Select.Option>
                            <Select.Option value="圆通">圆通</Select.Option>
                            <Select.Option value="邮政包裹">邮政包裹</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <Input style={{ width: '65%' }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">付款</Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal 
                visible={visible}
                footer={null}
                title="扫描二维码付款"
            >
                <QRCode level='H' value="http://tstxxy.icu" style={{display: 'block', margin: '0 auto'}}/>
            </Modal>
            <Button className={style.order} onClick={toOrder}>订单中心</Button>
        </>
    );
});

export default Pay