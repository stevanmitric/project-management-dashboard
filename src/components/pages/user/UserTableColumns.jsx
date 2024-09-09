import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import moment from 'moment';
import { handleDelete } from '../../../handlers/user/handleDelete';

export const columns = [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: text => (text ? `${text}` : 'Admin'),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: text => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <div className='flex space-x-4'>
        <a
          href={`/user/${record._id}`}
          className='font-medium text-white hover:text-black hover:underline'
        >
          <EditOutlined />
        </a>
        <Popconfirm
          title='Are you sure to delete this user?'
          onConfirm={() => handleDelete(record._id)}
          okText='Yes'
          cancelText='No'
        >
          <a className='text-red-600 hover:text-red-800'>
            <DeleteOutlined />
          </a>
        </Popconfirm>
      </div>
    ),
  },
];
