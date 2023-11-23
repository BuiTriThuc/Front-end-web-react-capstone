import axios from 'axios';

interface IParams {
  userId: any;
}

export default async function GetUserById(params: IParams) {
  try {
    const { userId } = params;
    const userDetail = await axios.get(`${process.env.API_URL}/users/${userId}`);

    console.log('Check detail', userDetail.data);

    if (!userDetail) {
      return null;
    }

    return userDetail.data;
  } catch (error) {}
}
