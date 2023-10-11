import axios from "axios";

export default async function getListUser() {
  try {
    const users = await axios.get(
      `${process.env.API_URL}/users/search?limit=20&offset=0`
    );

    if (!users) {
      return null;
    }

    return users.data;
  } catch (error) {}
}
