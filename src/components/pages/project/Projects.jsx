import { PlusOutlined } from '@ant-design/icons';
import { Button, Layout, Modal, Select, Spin, Typography, theme } from 'antd';
import { useEffect, useState } from 'react';
import SearchBar from '../../forms/SearchBar';
import NewProject from '../../modals/NewProject';
import SingleProjectCard from '../../SingleProjectCard';

import { useLoadingStore } from '../../../helpers/store';
import { projectsAPI } from '../../api/project';

const { Title } = Typography;

const { Content } = Layout;

export default function Projects() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading, setIsLoading } = useLoadingStore();

  const [selectedTypes, setSelectedTypes] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getAllProjects = async () => {
    try {
      setIsLoading(true);
      const response = await projectsAPI.getAllProjects();

      setProjects(response);

      setIsLoading(false);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleAddProject = async project => {
    try {
      await projectsAPI.createProject(project);
      setShowProjectModal(false);
      getAllProjects();
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  const handleCancel = () => {
    setShowProjectModal(false);
  };

  const handleOpenModal = () => {
    setShowProjectModal(true);
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleFilterChange = types => {
    setSelectedTypes(types);
  };

  const filteredProjects = projects
    ?.filter(
      project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      project =>
        selectedTypes.length === 0 || selectedTypes.includes(project.type)
    );

  return (
    <Content className={`p-2 m-0 ${colorBgContainer} rounded-lg h-full`}>
      <div>
        <div className='flex flex-col sm:flex-row sm:items-center py-2 mb-4 text-sm font-medium text-center'>
          <div className='max-w-96 sm:w-auto sm:flex-1'>
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className='sm:ml-4 mt-2 sm:mt-0 sm:w-64'>
            <Select
              mode='multiple'
              placeholder='Filter by Type'
              className='w-full'
              onChange={handleFilterChange}
              options={[
                { value: 'businessProject', label: 'Business Project' },
                { value: 'softwareProject', label: 'Software Project' },
                { value: 'serviceManagement', label: 'Service Management' },
                { value: 'productDiscovery', label: 'Product Discovery' },
              ]}
            />
          </div>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            className='sm:ml-4 mt-2 sm:mt-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-dark-navy'
            onClick={handleOpenModal}
          >
            New Project
          </Button>
        </div>

        <Modal
          title='New Project'
          open={showProjectModal}
          onCancel={handleCancel}
          footer={null}
        >
          <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
        </Modal>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {isLoading && filteredProjects.length === 0 ? (
            <Spin size='large' />
          ) : filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <SingleProjectCard key={project._id} project={project} />
            ))
          ) : (
            !isLoading &&
            filteredProjects.length === 0 && (
              <Title level={4}>No projects found</Title>
            )
          )}
        </div>
      </div>
    </Content>
  );
}
