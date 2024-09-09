import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Layout,
  Modal,
  Popconfirm,
  Table,
  Typography,
  theme,
} from 'antd';
import { useEffect } from 'react';
import {
  useClientsStore,
  useShowClientModalStore,
} from '../../../helpers/store';
import { clientsAPI } from '../../api/client';
import '../../DarkModeTable.css';
import NewClient from '../../modals/NewClient';

export default function Clients() {
  const { clients, setClients } = useClientsStore();
  const { showClientModal, setShowClientModal } = useShowClientModalStore();
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

  const handleDelete = async id => {
    try {
      await clientsAPI.deleteClientById(id);

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
        <div className='flex space-x-4'>
          <a
            href={`/client/${record._id}`}
            className='font-medium text-white hover:underline'
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title='Are you sure to delete this client?'
            onConfirm={() => handleDelete(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <a className='font-medium text-red-600 hover:underline'>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </div>
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
