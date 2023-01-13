import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../config';
import { Container, Line } from './styled-components';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container justify="center" align="middle">
      <div>
        <p className="ooops">Ooops...</p>
        <p className="pageNotFound">404 - page not found</p>
        <p className="desc">
          The page you are looking for might have been removed had its name changed or is
          temporarily unavailable.
        </p>

        <Button type="primary" shape="round" onClick={() => navigate(constants.routes.Root)}>
          Go to homepage
        </Button>
      </div>

      <Line ml={200} />
    </Container>
  );
};

export default ErrorPage;
