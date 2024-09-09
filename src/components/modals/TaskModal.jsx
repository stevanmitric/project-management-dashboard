import { DeleteOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Popconfirm, Select } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import TaskDropdown from '../TaskDropdown';

export default function TaskModal({
  onAdd,
  onUpdate,
  defaultStatus,
  projectId,
  task,
  onDelete,
}) {
  const { user } = useContext(AuthContext);

  const handleSave = values => {
    onAdd({
      title: values.title,
      description: values.description,
      status: values.status,
      projectId: projectId,
      reporter: user._id,
      dueDate: values.dueDate,
    });
  };

  const handleUpdate = values => {
    onUpdate({
      title: values.title,
      description: values.description,
      status: values.status,
      projectId: projectId,
      reporter: user._id,
    });
  };

  return (
    <Form
      layout='vertical'
      className='space-y-4 w-full'
      onFinish={task ? handleUpdate : handleSave}
      initialValues={{
        title: task && task?.title !== undefined ? task?.title : '',
        description:
          task && task?.description !== undefined ? task?.description : '',
        status: task ? task.status : defaultStatus,
      }}
    >
      <div className='flex justify-between'>
        <div className='flex flex-col space-y-4 w-full'>
          <Form.Item label='Set Status' name='status' required>
            <Select className='rounded-lg border-gray-300 shadow-sm max-w-[125px]'>
              <Select.Option value='To Do'>To Do</Select.Option>
              <Select.Option value='In Progress'>In Progress</Select.Option>
              <Select.Option value='Done'>Done</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='Title'
            name='title'
            rules={[
              { required: true, message: 'Please enter the project name' },
            ]}
          >
            <Input
              placeholder='Issue'
              className='dark:border-gray-500 dark:placeholder-gray-400'
            />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[
              { required: true, message: 'Please enter the description' },
            ]}
          >
            <Input.TextArea
              placeholder='Description'
              className='dark:border-gray-500 dark:placeholder-gray-400'
              style={{ minHeight: '150px' }}
            />
          </Form.Item>
        </div>
        {!task && (
          <Form.Item label='Due Date' name='dueDate'>
            <DatePicker className='w-full dark:border-gray-500' />
          </Form.Item>
        )}
      </div>
      {task && (
        <TaskDropdown
          className='ml-auto'
          reporter={task?.reporter?.email}
          assignee={task?.assignee?.email}
        />
      )}

      <Button
        type='primary'
        htmlType='submit'
        className={`${task ? `w-[430px]` : `w-full`} bg-dark-navy`}
      >
        {task ? 'Update' : 'Save'}
      </Button>
      {task && (
        <Popconfirm
          placement='left'
          title={`This will delete ${task?.title}`}
          onConfirm={() => onDelete(task?._id)}
          okText='Ok'
          cancelText='Cancel'
          okButtonProps={{ className: 'bg-dark-navy' }}
        >
          <DeleteOutlined className='p-[5px] ml-[15px]' title='Remove Task' />
        </Popconfirm>
      )}
    </Form>
  );
}
