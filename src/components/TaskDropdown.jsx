import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';
import { useTaskDropDownStore } from '../helpers/store';
export default function TaskDropdown({ reporter, assignee }) {
  const { isOpen, setIsOpen } = useTaskDropDownStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Card
      className='mb-4'
      bordered={false}
      style={{
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={toggleDropdown}
      >
        <h2 className='font-semibold'>Details</h2>
        <Button type='text' icon={isOpen ? <UpOutlined /> : <DownOutlined />} />
      </div>
      {isOpen && (
        <div className='mt-2'>
          <p className='text-gray-700'></p>
          <div className='mt-4'>
            <span className='text-sm text-gray-500'>Reporter:</span>
            <span className='text-sm font-semibold ml-2'>{reporter}</span>
          </div>
          <div className='mt-4'>
            <span className='text-sm text-gray-500'>Assignee:</span>
            <span className='text-sm font-semibold ml-2'>
              {assignee ? assignee : 'Unassigned'}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
