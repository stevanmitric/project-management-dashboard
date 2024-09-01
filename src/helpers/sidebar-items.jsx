import {
  DashboardOutlined,
  InboxOutlined,
  ProjectOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const items = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: <Link to='/dashboard'>Dashboard</Link>,
  },
  {
    key: '2',
    icon: <InboxOutlined />,
    label: <Link to='/inbox'>Inbox</Link>,
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: <Link to='/users'>Users</Link>,
  },
  {
    key: '4',
    icon: <TeamOutlined />,
    label: <Link to='/clients'>Clients</Link>,
  },
  {
    key: '5',
    label: <Link to='/projects'>Projects</Link>,
    icon: <ProjectOutlined />,
  },
];
