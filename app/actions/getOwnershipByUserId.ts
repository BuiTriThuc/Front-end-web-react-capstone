import useAxiosAuth from '../hooks/useAxiosAuth';
import GetCurrentUser from './getCurrentUser';
import axios from 'axios';

export default async function GetOwnershipByUserId() {
  try {
    const currentUser = await GetCurrentUser();
    const ownership = await axios.get(
      `https://holiday-swap.click/api/co-owners?userId=${currentUser?.userId}&pageNo=0&pageSize=10&sortDirection=desc`
    );

    if (!ownership) {
      return null;
    }

    return ownership.data;
  } catch (error) {}
}
