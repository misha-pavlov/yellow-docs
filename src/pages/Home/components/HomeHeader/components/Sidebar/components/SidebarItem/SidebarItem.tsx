import { FC } from 'react';
import { Container } from './styled-components';

type SidebarItemProps = {
  text: string;
  icon: JSX.Element;
};

const SidebarItem: FC<SidebarItemProps> = ({ icon, text }) => {
  return (
    <Container onClick={e => e.stopPropagation()}>
      {icon} {text}
    </Container>
  );
};

export default SidebarItem;
