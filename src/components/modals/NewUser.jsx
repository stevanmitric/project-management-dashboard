import { Button, Form, Input, Select } from 'antd';
import React from 'react';

export default function NewUser({ onAdd }) {
  const [form] = Form.useForm();

  const handleSave = values => {
    if (values.firstName && values.lastName && values.email) {
      onAdd({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
      });
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      initialValues={{ role: '' }} // Default value for role
      className='space-y-4'
    >
      <Form.Item
        label='First Name'
        name='firstName'
        rules={[{ required: true, message: 'Please input the first name!' }]}
      >
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500'
          placeholder='John'
        />
      </Form.Item>

      <Form.Item
        label='Last Name'
        name='lastName'
        rules={[{ required: true, message: 'Please input the last name!' }]}
      >
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500'
          placeholder='Doe'
        />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'Please input the email!' },
          { type: 'email', message: 'Please enter a valid email!' },
        ]}
      >
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 '
          placeholder='name@name.com'
        />
      </Form.Item>

      <Form.Item label='Choose a Role' name='role' required>
        <Select className='rounded-lg border-gray-300 shadow-sm '>
          <Select.Option value=''></Select.Option>
          <Select.Option value='admin'>Admin</Select.Option>
          <Select.Option value='manager'>Manager</Select.Option>
          <Select.Option value='developer'>Developer</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='w-full rounded-lg text-white bg-dark-navy'
        >
          Save User
        </Button>
      </Form.Item>
    </Form>
    // </Modal>
  );
}
