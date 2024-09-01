import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { items } from '../../../helpers/sidebar-items';
import UserModal from '../../modals/UserModal';

export default function Home() {
  const { Header, Sider } = Layout;

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const keyMapping = {
    '/dashboard': '1',
    '/inbox': '2',
    '/users': '3',
    '/clients': '4',
    '/projects': '5',
  };

  const selectedKey = keyMapping[location.pathname];

  return (
    <div className='flex flex-1'>
      <Layout>
        <Header className='flex w-full justify-between items-center p-2 bg-dark-navy'>
          <a href='/' className='flex ms-2 md:me-24'>
            <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
              Task Master
            </span>
          </a>
          <div className='flex items-center ms-3'>
            <UserModal />
          </div>
        </Header>
        <Layout className='min-h-screen flex'>
          <Sider
            collapsible
            collapsed={collapsed}
            className='min-h-screen'
            onCollapse={value => setCollapsed(value)}
          >
            <Menu
              theme='dark'
              mode='inline'
              items={items}
              defaultSelectedKeys={[selectedKey]}
              selectedKeys={[selectedKey]}
            />
          </Sider>
          <Layout className='flex-1 p-4'>
            <Outlet />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
