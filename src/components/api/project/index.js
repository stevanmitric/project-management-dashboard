import axios from 'axios';
// import { token } from '../../../helpers/get-token';

const token = localStorage.getItem('token');
export const projectsAPI = {
  getAllProjects: async () => {
    try {
      console.log('token', token);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Something went wrong!');
      }
    } catch (error) {
      console.error('error', error);
    }
  },

  createProject: async project => {
    try {
      const addProject = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/project`,
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return addProject.data;
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  },

  getProjectById: async id => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  },

  getTasksByProjectId: async projectId => {
    try {
      const filter = { projectId: projectId };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            filter: JSON.stringify(filter),
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  },

  getListsByProjectId: async projectId => {
    try {
      const filter = { projectId: projectId };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/lists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            filter: JSON.stringify(filter),
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  },

  createTaskList: async list => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/lists`,
        list,
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
