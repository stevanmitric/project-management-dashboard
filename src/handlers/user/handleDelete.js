import { notification } from 'antd';
import { usersAPI } from '../../components/api/user';

export const handleDelete = async id => {
  try {
    await usersAPI.deleteUserById(id);

    notification.success({
      message: 'Success',
      description: 'User deleted successfully!',
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.error('Delete user error:', error);
    notification.error({
      message: 'Error',
      description: 'Failed to delete user. Please try again.',
    });
  }
};
