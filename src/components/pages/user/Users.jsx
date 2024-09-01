import { Button, Layout, Modal, Table, Typography, theme } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { usersAPI } from '../../api/user';
import '../../DarkModeTable.css';
import NewUser from '../../modals/NewUser';

export default function User() {
  const { Title } = Typography;

  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await usersAPI.getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleAddUser = async user => {
    try {
      await usersAPI.createUser(user);
      setShowUserModal(false);
      getAllUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCancel = () => {
    setShowUserModal(false);
  };

  const handleOpenModal = () => {
    setShowUserModal(true);
  };

  const columns = [
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
      render: text => (text ? text : 'Admin'),
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
        <a
          href={`/user/${record._id}`}
          className='font-medium text-white hover:underline'
        >
          Edit
        </a>
      ),
    },
  ];

  return (
    <Content className={`p-2 m-0 ${colorBgContainer} rounded-lg h-full`}>
      <Title level={2}>Users</Title>
      <Button
        type='primary'
        onClick={handleOpenModal}
        className='mb-4 bg-dark-navy'
      >
        New User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey='_id'
        pagination={{ pageSize: 10 }}
        className='dark-mode-table rounded-lg bg-gray-900 border border-gray-700'
      />
      <Modal
        title='New User'
        open={showUserModal}
        onCancel={handleCancel}
        footer={null}
      >
        <NewUser onAdd={handleAddUser} onCancel={handleCancel} />
      </Modal>
    </Content>
  );
}
