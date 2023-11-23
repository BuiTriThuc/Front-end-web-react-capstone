import useAxiosAuth from '../hooks/useAxiosAuth';
import GetCurrentUser from './getCurrentUser';
import axios from 'axios';

export default async function GetOwnershipStaff() {
  try {
    const currentUser = await GetCurrentUser();
    const ownership = await axios.get(
      `https://holiday-swap.click/api/co-owners?pageNo=0&pageSize=8&sortBy=property_id&sortDirection=desc`
    );

    if (!ownership) {
      return null;
    }

    return ownership.data;
  } catch (error) {}
}
