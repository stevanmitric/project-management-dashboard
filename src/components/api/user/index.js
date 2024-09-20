import axios from 'axios';
import { token } from '../../../helpers/get-token';
export const usersAPI = {
  getAllUsers: async user => {
    try {
      const filter = { _id: { $ne: user._id } };
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/users`,
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
      console.error('Error: ', error);
    }
  },

  createUser: async user => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/users`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowUserModal(false);
      getAllUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  },

  getUserById: async id => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${id}`,
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

  updateUserById: async (user, id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteUserById: async id => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
