import { Button, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useManagersStore } from '../../helpers/store';

export default function EditClient() {
  const [form] = Form.useForm();

  const { id } = useParams();

  const { managers, setManagers } = useManagersStore();
  const token = localStorage.getItem('token');

  const getClientById = async id => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/client/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      form.setFieldsValue(response.data);
    }
  };

  const getAllManagers = async () => {
    try {
      const filter = { role: 'manager' };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/users`,
        {
          params: {
            filter: JSON.stringify(filter),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    getClientById(id);
  }, [id]);

  const handleUpdateClient = async client => {
    try {
      const addClient = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/client/${id}`,
        client,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (addClient.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Client updated successfully!',
        });
        setTimeout(() => {
          window.location.href = '/clients';
        }, 500);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update client. Please try again.',
      });
    }
  };
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleUpdateClient}
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

      <Form.Item label='Address' name='zip'>
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
          className='w-full rounded-lg text-white bg-dark-navy'
        >
          Update Client
        </Button>
      </Form.Item>
    </Form>
  );
}
