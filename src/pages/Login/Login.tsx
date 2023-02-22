import { Tabs, TabsProps, Image, Space, Spin } from 'antd';
import { SignIn, SignUp } from './components';
import { Container, LeftSide, RightSide } from './styled-components';
import LoginImage from '../../assets/login.svg';

const Login = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Sign In`,
      children: <SignIn />,
    },
    {
      key: '2',
      label: `Sign Up`,
      children: <SignUp />,
    },
  ];

  return (
    <Container>
      <LeftSide>
        <p className="yellowDocs">Yellow docs</p>
        <p className="somethingLikeText">Something like google docs</p>
        <Space direction="vertical" align="center">
          <Image
            width={400}
            preview={false}
            src={LoginImage}
            placeholder={<Spin tip="Loading" size="large" />}
          />
        </Space>
      </LeftSide>

      <RightSide align="middle">
        <p className="wellcome">Wellcome</p>
        <Tabs defaultActiveKey="1" items={tabItems} centered />
      </RightSide>
    </Container>
  );
};

export default Login;
