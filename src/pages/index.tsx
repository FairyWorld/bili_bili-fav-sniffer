import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import axios from 'axios';

const { TextArea } = Input;

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export default function Home() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();


    const onFinish = async (values: any) => {
        try {
            const response: {data: {msg: string}} = await axios.post('/api/start', {
                ...values
            });
            messageApi.open({
                type: 'success',
                content: response.data.msg,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            {contextHolder}
            <Head>
                <title>bili 收藏夹嗅探工具配置</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ width: '25%' }}
                >
                    <Form.Item name="token" label="TG 推送 token">
                        <Input />
                    </Form.Item>
                    <Form.Item name="chatID" label="TG 聊天 chat id">
                        <Input />
                    </Form.Item>
                    <Form.Item name="uid" label="uid" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="fid" label="fid" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="rss_domain" label="RSSHub 服务" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="cookies" label="cookies">
                        <TextArea rows={8} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset} className={styles.reset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        </>
    )
}
