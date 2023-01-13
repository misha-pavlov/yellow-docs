import { Col, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../config';
import { Container } from './styled-components';

const Root = () => {
  const isUserLoggedIn = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      setTimeout(() => navigate(constants.routes.Home), 1000);
    }

    setTimeout(() => navigate(constants.routes.Login), 1000);
  }, [isUserLoggedIn, navigate]);

  return (
    <Container justify="center" align="middle">
      <Col>
        <Spin tip="Loading" size="large" />
      </Col>
    </Container>
  );
};

export default Root;
