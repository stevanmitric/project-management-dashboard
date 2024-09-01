import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NewClient({ onAdd }) {
  const [form] = Form.useForm();

  const [managers, setManagers] = useState([]);

  const getAllManagers = async () => {
    try {
      const filter = { role: 'manager' };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/users`,
        {
          params: {
            filter: JSON.stringify(filter),
          },
        }
      );

      if (response.status === 200) {
        setManagers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllManagers();
  }, []);

  const handleSave = values => {
    // if (values.firstName && values.lastName && values.email) {
    onAdd({
      name: values.name,
      code: values.code,
      pib: values.pib,
      zip: values.zip,
      address: values.address,
      authorizedPerson: values.authorizedPerson,
      projectManager: values.projectManager,
      role: values.role,
    });
    // }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      className='space-y-4'
    >
      <Form.Item
        label='Client name'
        name='name'
        rules={[{ required: true, message: 'Please input the client name!' }]}
      >
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500'
          placeholder='Client'
        />
      </Form.Item>

      <Form.Item
        label='Code'
        name='code'
        rules={[{ required: true, message: 'Please input the code!' }]}
      >
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500'
          placeholder='12345678'
        />
      </Form.Item>

      <Form.Item
        label='Pib'
        name='pib'
        rules={[{ required: true, message: 'Please input the company pib!' }]}
      >
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 '
          placeholder='123456789'
        />
      </Form.Item>

      <Form.Item label='Zip code' name='zip'>
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 '
          placeholder='11000'
        />
      </Form.Item>

      <Form.Item label='Address' name='address'>
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 '
          placeholder='Street name 2b'
        />
      </Form.Item>

      <Form.Item label='Authorized person' name='authorizedPerson'>
        <Input
          className='rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 '
          placeholder='John Doe'
        />
      </Form.Item>

      <Form.Item label='Choose a Manager' name='projectManager'>
        <Select className='rounded-lg border-gray-300 shadow-sm '>
          {/* TODO: GET A LIST OF USERS THAT ARE PROJECT MANAGERS FOR A COMPANY AND ADD THOSE OPTIONS */}
          <Select.Option value=''></Select.Option>
          {managers &&
            managers.length > 0 &&
            managers.map(manager => (
              <Select.Option key={manager._id} value={manager._id}>
                {manager.firstName} {manager.lastName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='w-full rounded-lg text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700'
        >
          Save Client
        </Button>
      </Form.Item>
    </Form>
  );
}
