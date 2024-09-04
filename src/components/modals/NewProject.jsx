import { Button, DatePicker, Form, Input, Select } from 'antd';
import 'antd/dist/reset.css';

export default function NewProject({ onAdd, onCancel }) {
  function handleSave(values) {
    onAdd(values);
  }

  return (
    <Form layout='vertical' className='space-y-4' onFinish={handleSave}>
      <Form.Item
        label='Project Name'
        name='title'
        rules={[{ required: true, message: 'Please enter the project name' }]}
      >
        <Input
          placeholder='Project Name'
          className='dark:border-gray-500 dark:placeholder-gray-400'
        />
      </Form.Item>

      <Form.Item
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Please enter the description' }]}
      >
        <Input.TextArea
          placeholder='Description'
          className='dark:border-gray-500 dark:placeholder-gray-400'
        />
      </Form.Item>

      <Form.Item label='Choose a Project Type' name='type' required>
        <Select className='rounded-lg border-gray-300 shadow-sm '>
          <Select.Option value=''></Select.Option>
          <Select.Option value='businessProject'>
            Business Project
          </Select.Option>
          <Select.Option value='softwareProject'>
            Software Project
          </Select.Option>
          <Select.Option value='serviceManagement'>
            Service Management
          </Select.Option>
          <Select.Option value='productDiscovery'>
            Product Discovery
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label='Due Date'
        name='dueDate'
        rules={[{ required: true, message: 'Please select a due date' }]}
      >
        <DatePicker className='w-full dark:border-gray-500' />
      </Form.Item>

      <Button type='primary' htmlType='submit' className='w-full bg-dark-navy'>
        Save Project
      </Button>
    </Form>
  );
}
