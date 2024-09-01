import { SendOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';

export default function ChatForm() {
  const [messageText, setMessageText] = useState('');
  const handleChange = e => {
    e.preventDefault();

    setMessageText(e.target.value);
  };
  return (
    <form className=''>
      <label htmlFor='chat' className='sr-only'>
        Your message
      </label>
      <div className='flex items-center px-3 py-2 rounded-lg bg-gray-700'>
        <Button
          type='default'
          icon={<UploadOutlined />}
          className='inline-flex justify-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
        />
        <Button
          type='default'
          icon={<SmileOutlined />}
          className='p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
        />
        <Input.TextArea
          id='chat'
          rows={1}
          className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-800 rounded-lg border border-gray-600 focus:ring-blue-500 dark:text-white focus:border-blue-500 placeholder-gray-400 focus:bg-gray-800'
          placeholder='Your message...'
          value={messageText}
          onChange={e => handleChange(e)}
        />
        <Button
          type='primary'
          shape='circle'
          icon={<SendOutlined className='rtl:-rotate-90' />}
        />
      </div>
    </form>
  );
}
