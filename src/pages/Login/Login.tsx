import { BookTwoTone } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { colors } from '../../config';
import { SignIn, SignUp } from './components';
import { Container, LeftSide, RightSide } from './styled-components';

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
        <BookTwoTone twoToneColor={colors.yellow600} style={{ fontSize: 400 }} />
      </LeftSide>

      <RightSide align="middle">
        <p className="wellcome">Wellcome</p>
        <Tabs defaultActiveKey="1" items={tabItems} centered />
      </RightSide>
    </Container>
  );
};

export default Login;
