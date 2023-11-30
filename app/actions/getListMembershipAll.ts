import axios from 'axios';

export default async function GetListMembershipAll() {
  try {
    const memberships = await axios.get(
      `${process.env.API_URL}/users/search?status=ACTIVE&status=BLOCKED&roleIds=2&limit=1000&offset=0&sortProps=id&sortDirection=desc`
    );

    if (!memberships) {
      return null;
    }

    return memberships.data;
  } catch (error) {}
}
