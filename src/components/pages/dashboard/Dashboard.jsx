import { SmileOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import React from 'react';

export default function Dashboard({ isSidebarOpen }) {
  const { Header, Content, Sider } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content className={`p-6 m-0 ${colorBgContainer} rounded-lg h-full`}>
      {/* <Card
        title='Project Name'
        bordered={true}
        style={{ maxWidth: 300 }}
        className='shadow'
      >
        <p>Description</p>
        <Button
          type='primary'
          href='#'
          icon={<ArrowRightOutlined />}
          className='flex items-center'
        >
          Read more
        </Button>
      </Card> */}
      <div className='flex flex-col items-center justify-center h-full'>
        <SmileOutlined style={{ fontSize: '48px', color: '#001529' }} />
        <div className='mt-4 text-xl'>Coming soon</div>
      </div>
    </Content>
  );
}
