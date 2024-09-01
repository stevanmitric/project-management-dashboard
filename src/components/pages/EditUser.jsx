import { Button, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditUser() {
  const { id } = useParams();

  const [form] = Form.useForm();

  const getUserData = async id => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${id}`
      );

      if (response.status === 200) {
        form.setFieldsValue(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async user => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${id}`,
        user
      );

      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'User updated successfully!',
        });

        setTimeout(() => {
          window.location.href = '/users';
        }, 500);
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        description: 'Failed to update user. Please try again.',
      });
    }
  };

  useEffect(() => {
    getUserData(id);
  }, [id]);

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleUpdateUser}
      className='space-y-4 max-w-2xl'
    >
      <Form.Item label='First Name' name='firstName'>
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500'
          placeholder='John'
          disabled
        />
      </Form.Item>

      <Form.Item label='Last Name' name='lastName'>
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500'
          placeholder='Doe'
          disabled
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
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
}
