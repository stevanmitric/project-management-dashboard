import axios from 'axios';
import { token } from '../../../helpers/get-token';

export const inviteAPI = {
  sendInvite: async email => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/invites`,
        {
          email: email,
        },
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
};
