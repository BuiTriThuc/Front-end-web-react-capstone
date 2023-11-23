import requireAuth from '@/app/libs/requireAuth';
import DashBoardAdmin from '../../components/admin/DashBoardAdmin';
import GetListUser from '@/app/actions/getListUser';

export default async function DashboardAdminPage() {
  const listUser = await GetListUser();
  return requireAuth(
    <div>
      <DashBoardAdmin listUser={listUser} />
    </div>,
    [1]
  );
}
