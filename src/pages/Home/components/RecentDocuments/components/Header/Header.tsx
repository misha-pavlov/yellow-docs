import { CaretDownOutlined, DatabaseOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { OwnedEnum } from '../../../../../../types/document.types';
import { Container } from './styled-components';

type HeaderProps = {
  owned: OwnedEnum;
  changeOwned: (newOwned: OwnedEnum) => void;
};

const Header: FC<HeaderProps> = ({ owned, changeOwned }) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const stickyRef = useRef(null);

  const handleScroll = useCallback(
    (isUnmount = false) => {
      const cachedRef = stickyRef.current,
        // setIsSticky(e.intersectionRatio < 1)
        observer = new IntersectionObserver(
          ([e]) => {
            const newIsSticky = e.intersectionRect.top <= 64;

            if (isSticky !== newIsSticky) {
              setIsSticky(newIsSticky);
            }
          },
          {
            threshold: [1],
          }
        );

      if (isUnmount) {
        if (cachedRef) {
          observer.observe(cachedRef);
        }
      } else {
        if (cachedRef) {
          observer.observe(cachedRef);
        }
      }
    },
    [isSticky]
  );

  useEffect(() => {
    window.addEventListener('scroll', () => handleScroll());

    // unmount
    return window.removeEventListener('scroll', () => handleScroll(true));
  }, [handleScroll]);

  const toggleDropdown = () => {
    setIsShowDropdown(prevProps => !prevProps);
  };

  const selectOwned = (key: OwnedEnum) => {
    toggleDropdown();
    if (key !== owned) {
      changeOwned(key);
    }
  };

  const ownedDropdown: MenuProps['items'] = [
    {
      label: <span>Owned by anyone</span>,
      onClick: () => selectOwned(OwnedEnum.BY_ANYONE),
      key: OwnedEnum.BY_ANYONE,
    },
    {
      label: <span>Owned by me</span>,
      onClick: () => selectOwned(OwnedEnum.BY_ME),
      key: OwnedEnum.BY_ME,
    },
    {
      label: <span>Not owned by me</span>,
      onClick: () => selectOwned(OwnedEnum.NOT_BY_ME),
      key: OwnedEnum.NOT_BY_ME,
    },
  ];

  // as type for correnct types
  const currentOwned = ownedDropdown.find((ownedItem) => ownedItem?.key === owned && ownedDropdown) as { label: string }

  return (
    <Container ref={stickyRef} isSticky={isSticky}>
      <Space align="center" className="header-wrapper">
        <div className="right">Recent documents</div>
        <Space size={85} align="center" className="left">
          <Dropdown
            menu={{
              items: ownedDropdown,
              selectable: true,
              defaultSelectedKeys: [owned],
            }}
            trigger={['click']}
            placement="bottom"
            open={isShowDropdown}
          >
            <Button
              type="text"
              icon={<CaretDownOutlined />}
              onClick={toggleDropdown}
              {...(isShowDropdown && { className: 'active' })}
            >
              {currentOwned.label}
            </Button>
          </Dropdown>

          <Space align="center" size={10}>
            <Tooltip placement="bottom" title="List view">
              <Button type="text" icon={<DatabaseOutlined />} />
            </Tooltip>

            <Tooltip placement="bottom" title="Sort options">
              <Button type="text" icon={<SortAscendingOutlined />} />
            </Tooltip>
          </Space>
        </Space>
      </Space>
    </Container>
  );
};

export default Header;
