import axios from 'axios';
import { token } from '../../../helpers/get-token';
export const clientsAPI = {
  getAllClients: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/clients`,
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
      console.error('Error: ', error);
    }
  },

  createClient: async client => {
    try {
      const addClient = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/clients`,
        client,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return addClient.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteClientById: async id => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/client/${id}`,
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
