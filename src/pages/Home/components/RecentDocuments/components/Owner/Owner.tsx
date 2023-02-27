import { Skeleton } from 'antd';
import { useCurrentUserQuery, useUserByIdQuery } from '../../../../../../store/userApi/user.api';

const Owner = ({ ownerId }: { ownerId: string }) => {
  const { data: currentUser, isLoading: isCurrentLoading } = useCurrentUserQuery();
  const { data, isLoading: isDataLoading } = useUserByIdQuery({ userId: ownerId });

  if (isCurrentLoading || isDataLoading) {
    return <Skeleton.Button />;
  }

  return (
    <span>{currentUser?._id === data?._id ? 'Me' : `${data?.firstName} ${data?.lastName}`}</span>
  );
};

export default Owner;
