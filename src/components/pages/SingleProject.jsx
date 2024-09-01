import { PlusOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskListModal from '../modals/TaskListModal';
import SearchBar from '../SearchBar';
import TaskList from '../TaskList';
import TasksTable from '../TasksTable';
import Timeline from './Timeline';

export default function SingleProject() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showListModal, setShowListModal] = useState(false);
  const [lists, setLists] = useState([]);

  const [view, setView] = useState('board');

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const token = localStorage.getItem('token');

  const filteredTasks = tasks?.filter(
    task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSingleProject = async id => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProject(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const getAllLists = async projectId => {
    try {
      const filter = { projectId: projectId };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/lists`,
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
        setLists(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProject(id);
    getAllTasks(id);
    getAllLists(id);
  }, [id]);

  const dueDate = moment(project?.dueDate).format('DD-MM-YYYY');

  const handleAddList = async list => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/lists`,
        list,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setShowListModal(false);
        getAllLists(id); // Re-fetch lists after adding
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeView = value => {
    setView(value);
  };

  return (
    <div>
      <div className='p-2'>
        <h1 className='ml-3 text-2xl font-bold mb-4'>{project?.title}</h1>
        <div
          className={`absolute top-20 right-10 text-right p-2 rounded-full border-4 ${
            new Date(project?.dueDate) < new Date()
              ? 'bg-red-500 border-red-700'
              : 'bg-green-500 border-green-600'
          }`}
          id='due-date-container'
        >
          <p className='text-white font-bold'>Due Date: {dueDate}</p>
        </div>
      </div>
      <div className='flex items-center justify-start'>
        <div className='max-w-96 sm:w-auto sm:flex-1'>
          <SearchBar handleSearch={handleSearch} page='project' />
        </div>
        <Avatar
          className='mb-4'
          size='small'
          icon={
            <span className='text-2xl'>
              <UserOutlined />
            </span>
          }
        />
        <span className='mb-4 ml-4 text-2xl'>
          <UserAddOutlined />
        </span>
        <Select
          className='rounded-lg border-gray-300 shadow-sm w-48 mb-4 ml-28'
          onChange={handleChangeView}
          placeholder='Planning'
          defaultValue='board'
        >
          <Select.Option value='board'>Board</Select.Option>
          <Select.Option value='timeline'>Timeline</Select.Option>
          <Select.Option value='table'>Table</Select.Option>
        </Select>
      </div>

      <div className='flex justify-items-start'>
        {view === 'board' ? (
          <>
            {lists &&
              lists.length > 0 &&
              lists.map(list => (
                <TaskList
                  key={list._id}
                  title={list.title}
                  tasks={filteredTasks.filter(
                    task => task.status === list.title
                  )}
                  projectId={id}
                  listId={list._id}
                />
              ))}
            <Button
              onClick={() => setShowListModal(true)}
              className='left-5 right-10 bg-dark-navy text-white'
              icon={<PlusOutlined />}
            />
            <Modal
              open={showListModal}
              onCancel={() => setShowListModal(false)}
              footer={null}
            >
              <TaskListModal onAdd={handleAddList} />
            </Modal>
          </>
        ) : view === 'table' ? (
          <TasksTable />
        ) : (
          <Timeline tasks={tasks} />
        )}
      </div>
    </div>
  );
}
