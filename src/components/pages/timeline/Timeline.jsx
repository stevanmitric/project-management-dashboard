import { SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import React from 'react';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
export default function Timeline({ tasks }) {
  const events = tasks.map(task => ({
    title: task.title,
    start: new Date(task.createdAt), // Use dueDate as the start time
    end: new Date(new Date(task.dueDate).getTime() + 60 * 60 * 1000), // Assuming 1-hour duration
  }));
  return (
    // <div className='ml-5 mr-5 w-full h-screen bg-dark-navy text-white'>
    //   <Calendar
    //     localizer={localizer}
    //     events={events}
    //     defaultView='month'
    //     views={['month', 'week', 'day', 'agenda']}
    //     startAccessor='start'
    //     endAccessor='end'
    //   />
    // </div>
    <div className='flex flex-col items-center justify-center h-full'>
      <SmileOutlined style={{ fontSize: '48px', color: '#001529' }} />
      <div className='mt-4 text-xl'>Coming soon</div>
    </div>
  );
}
