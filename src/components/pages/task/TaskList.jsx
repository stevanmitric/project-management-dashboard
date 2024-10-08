import { MoreOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  List,
  Modal,
  Typography,
} from 'antd';
import {
  useSelectedTaskStore,
  useShowTaskModalStore,
} from '../../../helpers/store';
import { tasksAPI } from '../../api/task';
import TaskModal from '../../modals/TaskModal';

export default function TaskList({ title, tasks, projectId, listId }) {
  const { showTaskModal, setShowTaskModal } = useShowTaskModalStore();
  const { selectedTask, setSelectedTask } = useSelectedTaskStore();

  const { Title } = Typography;

  const filteredList = tasks.filter(task => task.status === title);

  const token = localStorage.getItem('token');

  const handleOpenModal = task => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const handleAddTask = async task => {
    try {
      await tasksAPI.createTask(task, listId);

      setShowTaskModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const menu = [
    {
      key: 'setLimit',
      label: 'Set Limit',
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: () => handleDeleteList(listId),
    },
  ];

  const handleUpdateTask = async task => {
    try {
      await tasksAPI.updateTask(task, listId, selectedTask);
      setShowTaskModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async id => {
    try {
      await tasksAPI.deleteTask(id);
      setShowTaskModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteList = async id => {
    try {
      await tasksAPI.deleteTaskList(id);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex ml-3 mb-6'>
      <List
        itemLayout='vertical'
        size='small'
        dataSource={filteredList}
        renderItem={task => (
          <List.Item>
            <Card
              hoverable
              className='relative border border-gray-200 rounded-lg shadow dark:border-gray-200'
              onClick={() => handleOpenModal(task)}
            >
              <Title level={5}>{task.title}</Title>
              <Avatar
                className='absolute bottom-2 right-2'
                size='small'
                icon={<UserOutlined />}
              />
            </Card>
          </List.Item>
        )}
        header={
          <>
            <div className='flex items-center justify-between p-2'>
              <div className='text-xl font-bold text-white'>{title}</div>
              <Dropdown menu={{ items: menu }} trigger={['click']}>
                <Button className='bg-dark-navy text-white'>
                  <MoreOutlined rotate={90} />
                </Button>
              </Dropdown>
            </div>
            <Divider className='bg-white mt-0 mb-2' />
          </>
        }
        className='rounded-lg bg-dark-navy shadow border-gray-900 relative min-w-[300px]'
      >
        <List.Item className='relative'>
          <Button
            onClick={() => setShowTaskModal(true)}
            className='border-none bg-none transition-opacity duration-300 top-0 left-0'
            icon={<PlusOutlined />}
          />
        </List.Item>
      </List>
      <Modal
        title={selectedTask ? 'Update Issue' : 'New Issue'}
        open={showTaskModal}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskModal
          onAdd={handleAddTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          defaultStatus={title}
          projectId={projectId}
          task={selectedTask}
        />
      </Modal>
    </div>
  );
}
