import axios from 'axios';

export default async function GetListUser(config: any = {}) {
  try {
    const { email } = config;

    let apiUrl = `${process.env.API_URL}/users/search?limit=999&offset=0&sortProps=id&sortDirection=desc`;

    if (email) {
      apiUrl += `&email=${email}`;
    }

    const users = await axios.get(apiUrl);

    if (!users) {
      return null;
    }

    return users.data;
  } catch (error) {}
}
