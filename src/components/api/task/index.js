import axios from 'axios';
import { token } from '../../../helpers/get-token';

export const tasksAPI = {
  createTask: async (task, listId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/tasks`,
        {
          task,
          listId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  updateTask: async (task, listId, selectedTask) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/task/${selectedTask._id}`,
        {
          task,
          listId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteTask: async id => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteTaskList: async id => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
