import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Layout,
  Modal,
  Popconfirm,
  Table,
  Typography,
  theme,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DarkModeTable.css';
import TaskModal from './modals/TaskModal';

export default function TasksTable() {
  const { Title } = Typography;

  const { Content } = Layout;

  const { id } = useParams();
  const token = localStorage.getItem('token');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const getAllTasks = async projectId => {
    try {
      const filter = { projectId: projectId };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/tasks`,
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
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks(id);
  }, [id]);

  const handleAddTask = async task => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/tasks`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowTaskModal(false);
      getAllTasks();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteTask = async id => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowTaskModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setShowTaskModal(false);
  };

  const handleOpenModal = () => {
    setShowTaskModal(true);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => `${record.title}`,
    },
    {
      title: 'Reporter',
      dataIndex: 'reporter',
      key: 'reporter',
      render: (text, record) => `${record.reporter.email}`,
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (text, record) =>
        `${record?.assignee?.email ? record?.assignee?.email : `Unassigned`}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => `${record.status}`,
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
        <Popconfirm
          placement='left'
          title={`This will delete ${record?.title}`}
          onConfirm={() => handleDeleteTask(record?._id)}
          okText='Ok'
          cancelText='Cancel'
          okButtonProps={{ className: 'bg-dark-navy' }}
        >
          <DeleteOutlined className='p-[5px] ml-[15px]' title='Remove Task' />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Content className={`p-2 m-0 ${colorBgContainer} rounded-lg h-full`}>
      <Title level={2}>List</Title>
      <Button
        type='primary'
        onClick={handleOpenModal}
        className='mb-4 bg-dark-navy'
      >
        New Task
      </Button>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey='_id'
        pagination={{ pageSize: 10 }}
        className='dark-mode-table rounded-lg bg-gray-900 border border-gray-700'
      />
      <Modal
        title='New Issue'
        open={showTaskModal}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskModal
          onAdd={handleAddTask}
          onDelete={handleDeleteTask}
          projectId={id}
          // task={selectedTask}
        />
      </Modal>
    </Content>
  );
}
