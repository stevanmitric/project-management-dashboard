import { Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider';
import { signInAPI } from '../../api/sign-in';

export default function SignIn() {
  const [form] = Form.useForm();

  const { login } = useContext(AuthContext);

  const handleSubmit = async values => {
    try {
      const response = await signInAPI.signIn(values);

      if (response.data.token) {
        // Call the login function from AuthContext with user data and token
        await login(response.data.user, response.data.token);
        setTimeout(() => {
          notification.success({
            message: 'Success',
            description: 'Login successfull!',
          });
        }, 500);
      } else {
        // Handle login error (e.g., show an error message)
        notification.error({
          message: 'Failed',
          description: 'Login failed!',
        });
      }
    } catch (error) {
      console.error('Error during sign in: ', error);
    }
  };

  return (
    <section className='dark:bg-gray-800 min-h-screen flex items-center justify-center'>
      <div className='py-8 px-8 w-full max-w-2xl lg:py-16 lg:gap-16'>
        <div className='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-900'>
          <Typography.Title level={2} style={{ color: 'white' }}>
            Login to Task Master
          </Typography.Title>
          <Form
            layout='vertical'
            className='mt-8 space-y-6'
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item
              label={<span className='text-white'>Your email</span>}
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                type='email'
                name='email'
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white'>Your password</span>}
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                name='password'
                placeholder='••••••••'
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </Form.Item>
            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox
                name='remember'
                className='text-gray-500 dark:text-gray-400'
              >
                Remember this device
              </Checkbox>
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Login
            </Button>
            <div className='text-sm font-medium text-gray-900 dark:text-white'>
              Not registered yet?{' '}
              <a
                className='text-blue-600 hover:underline dark:text-blue-500'
                href='/sign-up'
              >
                Create account
              </a>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
