import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export default async function GetOwnerHistoryBooking() {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.access_token;
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    const historyOwnerBooking = await axios.get(
      'https://holiday-swap.click/api/booking/ownerhistorybooking',
      config
    );

    if (!historyOwnerBooking) {
      return null;
    }

    return historyOwnerBooking.data;
  } catch (error) {}
}
