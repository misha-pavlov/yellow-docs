import { Col, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { constants } from '../../config';
import { UserLoading } from '../../types/user.types';
import { Container } from './styled-components';

const Root = () => {
  // for fix error with generic types
  const { userPromise } = (useLoaderData() as unknown) as UserLoading;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await userPromise;

      if (user) {
        navigate(constants.routes.Home);
      } else {
        navigate(constants.routes.Login);
      }
    })();
  }, [navigate, userPromise]);

  return (
    <Container justify="center" align="middle">
      <Col>
        <Spin tip="Loading" size="large" />
      </Col>
    </Container>
  );
};

export default Root;
