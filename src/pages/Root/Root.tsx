import { Col, Spin } from 'antd';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { constants } from '../../config';
import { TokenLoading } from '../../types/user.types';
import { Container } from './styled-components';

const Root = () => {
  // as unknown for fix error with generic types
  const { tokenPromise } = (useLoaderData() as unknown) as TokenLoading;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = await tokenPromise;

      if (token) {
        navigate(constants.routes.Home);
      } else {
        navigate(constants.routes.Login);
      }
    })();
  }, [navigate, tokenPromise]);

  return (
    <Container justify="center" align="middle">
      <Col>
        <Spin tip="Loading" size="large" />
      </Col>
    </Container>
  );
};

export default Root;
