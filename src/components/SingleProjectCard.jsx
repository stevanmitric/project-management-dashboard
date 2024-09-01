import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, notification, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title, Paragraph } = Typography;

export default function SingleProjectCard({ project }) {
  const handleDeleteProject = async id => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/project/${id}`
      );

      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Project deleted successfully!',
        });

        setTimeout(() => {
          window.location.href = '/projects';
        }, 500);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete project. Please try again.',
      });
    }
  };
  return (
    <Card
      hoverable
      className='relative max-h-96 max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:border-gray-200 bg-dark-navy'
    >
      <a className='mb-2' href={`/project/${project._id}`}>
        <Title level={2} style={{ color: 'white' }}>
          {project.title}
        </Title>
      </a>

      <Paragraph
        ellipsis={{ rows: 3, expandable: false }}
        className='mb-3 text-white dark:border-gray-400'
      >
        {project.description}
      </Paragraph>
      <Paragraph className='font-bold text-white'>
        Due Date: {moment(project.dueDate).format('DD-MM-YYYY')}
      </Paragraph>
      <Button
        className='absolute bottom-2 right-2 p-2'
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteProject(project._id)}
      />
    </Card>
  );
}
