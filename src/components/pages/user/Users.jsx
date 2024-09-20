import { Layout, Table, Typography, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider';
import { usersAPI } from '../../api/user';
import '../../DarkModeTable.css';
import { columns } from './UserTableColumns';

export default function User() {
  const { user } = useContext(AuthContext);
  const { Title } = Typography;

  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await usersAPI.getAllUsers(user);
      setUsers(response);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Content className={`p-2 m-0 ${colorBgContainer} rounded-lg h-full`}>
      <Title level={2}>Users</Title>
      {/* <Button
        type='primary'
        onClick={handleOpenModal}
        className='mb-4 bg-dark-navy'
      >
        New User
      </Button> */}
      <Table
        columns={columns}
        dataSource={users}
        rowKey='_id'
        pagination={{ pageSize: 10 }}
        className='dark-mode-table rounded-lg bg-gray-900 border border-gray-700'
      />
      {/* <Modal
        title='New User'
        open={showUserModal}
        onCancel={handleCancel}
        footer={null}
      >
        <NewUser onAdd={handleAddUser} onCancel={handleCancel} />
      </Modal> */}
    </Content>
  );
}
