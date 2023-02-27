import { CaretDownOutlined, DatabaseOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { OwnedEnum, SortEnum } from '../../../../../../types/document.types';
import { Container } from './styled-components';

type HeaderProps = {
  sort: SortEnum;
  owned: OwnedEnum;
  toggleIsTable: () => void;
  changeSort: (newSort: SortEnum) => void;
  changeOwned: (newOwned: OwnedEnum) => void;
};

const Header: FC<HeaderProps> = ({ owned, changeOwned, sort, changeSort, toggleIsTable }) => {
  const [isShowOpenedDropdown, setIsShowOpenedDropdown] = useState(false);
  const [isShowSortDropdown, setIsShowSortDropdown] = useState(false);
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

  const toggleOpenedDropdown = () => {
    setIsShowOpenedDropdown(prevProps => !prevProps);
  };

  const toggleSortDropdown = () => {
    setIsShowSortDropdown(prevProps => !prevProps);
  };

  const selectOwned = (key: OwnedEnum) => {
    toggleOpenedDropdown();
    if (key !== owned) {
      changeOwned(key);
    }
  };

  const selectSort = (key: SortEnum) => {
    toggleSortDropdown();
    if (key !== sort) {
      changeSort(key);
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

  const sortDropdown: MenuProps['items'] = [
    {
      label: <span>Last opened by me</span>,
      onClick: () => selectSort(SortEnum.LAST_OPENED_BY_ME),
      key: SortEnum.LAST_OPENED_BY_ME,
    },
    {
      label: <span>Last modified by me</span>,
      onClick: () => selectSort(SortEnum.LAST_MODIFIED_BY_ME),
      key: SortEnum.LAST_MODIFIED_BY_ME,
    },
    {
      label: <span>Last modified</span>,
      onClick: () => selectSort(SortEnum.LAST_MODIFIED),
      key: SortEnum.LAST_MODIFIED,
    },
    {
      label: <span>Title</span>,
      onClick: () => selectSort(SortEnum.TITLE),
      key: SortEnum.TITLE,
    },
  ];

  // as type for correnct types
  const currentOwned = ownedDropdown.find(
    ownedItem => ownedItem?.key === owned && ownedDropdown
  ) as { label: string };

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
            open={isShowOpenedDropdown}
          >
            <Button
              type="text"
              icon={<CaretDownOutlined />}
              onClick={toggleOpenedDropdown}
              {...(isShowOpenedDropdown && { className: 'active' })}
            >
              {currentOwned.label}
            </Button>
          </Dropdown>

          <Space align="center" size={10}>
            <Tooltip placement="bottom" title="List view">
              <Button type="text" onClick={toggleIsTable} icon={<DatabaseOutlined />} />
            </Tooltip>

            <Dropdown
              menu={{ items: sortDropdown, selectable: true, defaultSelectedKeys: [sort] }}
              trigger={['click']}
              placement="bottom"
              open={isShowSortDropdown}
            >
              <Tooltip
                placement="bottom"
                title="Sort options"
                {...(isShowSortDropdown && { open: false })}
              >
                <Button
                  type="text"
                  onClick={toggleSortDropdown}
                  icon={<SortAscendingOutlined />}
                  {...(isShowSortDropdown && { className: 'active' })}
                />
              </Tooltip>
            </Dropdown>
          </Space>
        </Space>
      </Space>
    </Container>
  );
};

export default Header;
