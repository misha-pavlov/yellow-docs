import {
  CaretDownOutlined,
  DatabaseOutlined,
  FolderOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from './styled-components';

const Header = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [currentOwned, setCurrentOwned] = useState(0);
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

  const selectCurrentOwned = (key: number) => {
    toggleDropdown();
    if (key !== currentOwned) {
      setCurrentOwned(key);
    }
  };

  const owned: MenuProps['items'] = [
    {
      label: <span>Owned by anyone</span>,
      onClick: () => selectCurrentOwned(0),
      key: '0',
    },
    {
      label: <span>Owned by me</span>,
      onClick: () => selectCurrentOwned(1),
      key: '1',
    },
    {
      label: <span>Not owned by me</span>,
      onClick: () => selectCurrentOwned(2),
      key: '2',
    },
  ];

  return (
    <Container ref={stickyRef} isSticky={isSticky}>
      <div className="header-wrapper">
        <div className="right">Recent documents</div>
        <div className="left">
          <Dropdown
            menu={{
              items: owned,
              selectable: true,
              defaultSelectedKeys: [currentOwned.toString()],
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
              Owned by anyone
            </Button>
          </Dropdown>

          <div className="icons-row">
            <Tooltip placement="bottom" title="List view">
              <Button type="text" icon={<DatabaseOutlined />} />
            </Tooltip>

            <Tooltip placement="bottom" title="Sort options">
              <Button type="text" icon={<SortAscendingOutlined />} />
            </Tooltip>

            <Tooltip placement="bottom" title="Open file picker">
              <Button type="text" icon={<FolderOutlined />} />
            </Tooltip>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
