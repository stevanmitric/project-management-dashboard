import { CheckOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
export default function TaskListModal({ onAdd }) {
  const { id } = useParams();
  const [form] = Form.useForm();
  const handleSave = values => {
    onAdd({
      title: values.title,
      projectId: id,
    });
  };
  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        className='space-y-4'
        onFinish={handleSave}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please enter the list name' }]}
        >
          <div className='flex items-center space-x-2'>
            <Input
              placeholder='To Do'
              className='max-w-96 dark:border-gray-500 dark:placeholder-gray-400'
            />
            <Button htmlType='submit' icon={<CheckOutlined />} />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
