import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../../../config';
import { useSignUpMutation } from '../../../../store/userApi/user.api';
import { validate } from '../../helpers';

const SignUp = () => {
  const [signUp, { data, isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorageKeys.token);

    // don't set token if we already have one
    if (!token && data) {
      localStorage.setItem(constants.localStorageKeys.token, data.token);
      // redirect to home screen
      navigate(constants.routes.Home);
    }
  }, [data, navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => signUp(values),
  });

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={formik.handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
        validateStatus={formik.errors.firstName ? 'error' : 'validating'}
        help={formik.errors.firstName}
      >
        <Input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
        validateStatus={formik.errors.lastName ? 'error' : 'validating'}
        help={formik.errors.lastName}
      >
        <Input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        validateStatus={formik.errors.email ? 'error' : 'validating'}
        help={formik.errors.email}
      >
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        validateStatus={formik.errors.password ? 'error' : 'validating'}
        help={formik.errors.password}
      >
        <Input.Password
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
