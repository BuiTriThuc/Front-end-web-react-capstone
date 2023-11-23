import axios from 'axios';

export default async function GetListUserStaffAdmin() {
  try {
    let apiUrl = `${process.env.API_URL}/users/search?roleIds=1&roleIds=3&limit=10&offset=0&sortProps=id&sortDirection=desc`;

    const users = await axios.get(apiUrl);

    if (!users) {
      return null;
    }

    return users.data;
  } catch (error) {}
}
