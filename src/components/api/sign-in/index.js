import axios from 'axios';

export const signInAPI = {
  signIn: async formData => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/login`,
        formData
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
