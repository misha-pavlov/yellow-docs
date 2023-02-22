import { Button, Form, Input, message } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { validate } from '../../helpers';
import { useSignInMutation } from '../../../../store/userApi/user.api';
import { constants } from '../../../../config';

const SignIn = () => {
  const [signIn, { data, error, isLoading, reset }] = useSignInMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (data) {
      // set new token
      localStorage.setItem(constants.localStorageKeys.token, data.token);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // show error message
      messageApi.open({
        type: 'error',
        // @ts-ignore because data is in error, but types say not
        content: error?.data.message,
      });
      // reset mutation for clean error
      reset();
    }
  }, [error, messageApi, reset]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: valid => validate(valid, true),
    onSubmit: values => signIn(values),
  });

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <>
      {/* display error message */}
      {contextHolder}
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
    </>
  );
};

export default SignIn;
