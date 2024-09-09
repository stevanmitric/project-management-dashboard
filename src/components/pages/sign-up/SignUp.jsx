import { Button, Checkbox, Form, Input, Typography, notification } from 'antd';
import { signUpAPI } from '../../api/sign-up';

export default function SignUp() {
  const [form] = Form.useForm();

  const handleSubmit = async values => {
    try {
      const response = await signUpAPI.signUp(values);

      if (response.status === 201) {
        window.location.href = '/login';
      } else {
        console.error('Error with sign up');
        notification.error({
          message: 'Failed',
          description: 'Sign up failed!',
        });
      }
    } catch (error) {
      console.error('Error during sign up: ', error);
    }
  };

  return (
    <section className='dark:bg-gray-800 min-h-screen flex items-center justify-center'>
      <div className='py-8 px-8 w-full max-w-2xl lg:py-16 lg:gap-16'>
        <div className='w-full p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-900'>
          <Typography.Title level={2} style={{ color: 'white' }}>
            Sign up to Task Master
          </Typography.Title>
          <Form
            layout='vertical'
            className='mt-8 space-y-6'
            onFinish={handleSubmit}
          >
            <Form.Item
              label={<span className='text-white'>First Name</span>}
              name='firstName'
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input
                name='firstName'
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='John'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white'>Last Name</span>}
              name='lastName'
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input
                name='lastName'
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Doe'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white'>Your email</span>}
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                type='email'
                name='email'
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </Form.Item>
            <Form.Item
              label={<span className='text-white'>Confirm Password</span>}
              name='confirmPassword'
              rules={[
                { required: true, message: 'Please confirm your password!' },
              ]}
            >
              <Input.Password
                name='confirmPassword'
                placeholder='••••••••'
                className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
              Sign up
            </Button>
            <div className='text-sm font-medium text-gray-900 dark:text-white'>
              Already have an account?{' '}
              <a
                className='text-blue-600 hover:underline dark:text-blue-500'
                href='/login'
              >
                Login
              </a>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
