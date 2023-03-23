import { FC } from 'react';
import { Container } from './styled-components';

type SidebarItemProps = {
  text: string;
  icon: JSX.Element;
  onClick?: VoidFunction;
};

const SidebarItem: FC<SidebarItemProps> = ({ icon, text, onClick }) => {
  return (
    <Container
      onClick={e => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {icon} {text}
    </Container>
  );
};

export default SidebarItem;
