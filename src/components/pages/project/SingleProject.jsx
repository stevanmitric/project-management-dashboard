import {
  CheckOutlined,
  PlusOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Input, Modal, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { inviteAPI } from '../../api/invite';
import { projectsAPI } from '../../api/project';
import SearchBar from '../../forms/SearchBar';
import TaskListModal from '../../modals/TaskListModal';
import TaskList from '../task/TaskList';
import Tasks from '../task/Tasks';
import Timeline from '../timeline/Timeline';

export default function SingleProject() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showListModal, setShowListModal] = useState(false);
  const [lists, setLists] = useState([]);

  const [showEmailInput, setShowEmailInput] = useState(false);

  const [view, setView] = useState('board');

  const [searchQuery, setSearchQuery] = useState('');

  const [email, setEmail] = useState('');

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const filteredTasks = tasks?.filter(
    task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSingleProject = async id => {
    try {
      const response = await projectsAPI.getProjectById(id);
      setProject(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTasks = async projectId => {
    try {
      const response = await projectsAPI.getTasksByProjectId(projectId);

      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllLists = async projectId => {
    try {
      const response = await projectsAPI.getListsByProjectId(projectId);

      setLists(response);
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
      await projectsAPI.createTaskList(list);
      setShowListModal(false);
      getAllLists(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendInvite = async e => {
    try {
      e.preventDefault();
      console.log('email', email);

      setShowEmailInput(!showEmailInput);
      await inviteAPI.sendInvite(email);
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
            <span className='text-xl'>
              <UserOutlined />
            </span>
          }
        />
        <Button
          type='text'
          className='mb-4 ml-4'
          icon={<UserAddOutlined />}
          onClick={() => setShowEmailInput(!showEmailInput)}
        />
        {showEmailInput && (
          <div className='flex items-center space-x-2 ml-2'>
            <Input
              placeholder='Enter email'
              className='max-w-96 dark:border-gray-500 dark:placeholder-gray-400'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              htmlType='submit'
              onClick={handleSendInvite}
              icon={<CheckOutlined />}
            />
          </div>
        )}
        <Select
          className='rounded-lg border-gray-300 shadow-sm w-48 mb-4 ml-44'
          onChange={handleChangeView}
          placeholder='Planning'
          defaultValue='board'
        >
          <Select.Option value='board'>Board</Select.Option>
          <Select.Option value='timeline'>Timeline</Select.Option>
          <Select.Option value='table'>Table</Select.Option>
        </Select>
      </div>

      <div className='flex flex-wrap justify-items-start'>
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
          <Tasks />
        ) : (
          <Timeline tasks={tasks} />
        )}
      </div>
    </div>
  );
}
