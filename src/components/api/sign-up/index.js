import axios from 'axios';

export const signUpAPI = {
  signUp: async formData => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/register`,
        formData
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
