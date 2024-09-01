import { Button, Layout, Modal, Table, Typography, theme } from 'antd';
import { useEffect, useState } from 'react';
import { clientsAPI } from '../../api/client';
import '../../DarkModeTable.css';
import NewClient from '../../modals/NewClient';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const { Title } = Typography;

  const { Content } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getAllClients = async () => {
    try {
      const response = await clientsAPI.getAllClients();

      setClients(response);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const handleAddClient = async client => {
    try {
      await clientsAPI.createClient(client);

      setShowClientModal(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setShowClientModal(false);
  };

  const handleOpenModal = () => {
    setShowClientModal(true);
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (text, record) => `${record.name}`,
    },
    {
      title: 'Authorized Person',
      dataIndex: 'authorizedPerson',
      key: 'authorizedPerson',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'PiB',
      dataIndex: 'pib',
      key: 'pib',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <a
          href={`/client/${record._id}`}
          className='font-medium text-white hover:underline'
        >
          Edit
        </a>
      ),
    },
  ];

  return (
    <Content className={`p-2 m-0 ${colorBgContainer} rounded-lg h-full`}>
      <Title level={2}>Clients</Title>
      <Button
        type='primary'
        onClick={handleOpenModal}
        className='mb-4 bg-dark-navy'
      >
        New Client
      </Button>
      <Table
        columns={columns}
        dataSource={clients}
        rowKey='_id'
        className='dark-mode-table rounded-lg text-gray-300 border border-gray-700 bg-gray-900'
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title='New Client'
        open={showClientModal}
        onCancel={handleCancel}
        footer={null}
      >
        <NewClient onAdd={handleAddClient} onCancel={handleCancel} />
      </Modal>
    </Content>
  );
}
