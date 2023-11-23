import GetCurrentUser from '@/app/actions/getCurrentUser';
import GetListMembership from '@/app/actions/getListMembership';
import TransferMoney from '@/app/components/dashboard/Transfer';
import requireAuth from '@/app/libs/requireAuth';

const Transfer: React.FC = async () => {
  const currentUser = await GetCurrentUser();
  const memberships = await GetListMembership();
  return requireAuth(<TransferMoney currentUser={currentUser} memberships={memberships} />, [2, 4]);
};

export default Transfer;
