import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';
import { getServerSession } from 'next-auth';

interface IParams {
  bookingId: string;
}

export default async function GetOwnerHistoryBookingById(params: IParams) {
  try {
    const { bookingId } = params;

    const session = await getServerSession(authOptions);
    const accessToken = session?.user?.access_token;
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    const historyOwnerBookingDetail = await axios.get(
      `https://holiday-swap.click/api/booking/ownerhistorybooking/${bookingId}`,
      config
    );

    if (!historyOwnerBookingDetail) {
      return null;
    }

    return historyOwnerBookingDetail.data;
  } catch (error) {}
}
