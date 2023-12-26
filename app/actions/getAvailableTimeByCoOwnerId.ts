import axios from 'axios';

interface IParams {
  coOwnerId: number;
  pageNo: number;
  pageSize: number;
  sortDirection: 'asc' | 'desc';
  sortBy: string;
}

export default async function getAvailableTimeByCoOwnerId(params: IParams) {
  try {
    const { coOwnerId, pageNo, pageSize, sortDirection, sortBy } = params;

    const approveDetail = await axios.get(
      // `https://holiday-swap.click/api/co-owners/detail?propertyId=${propertyId}&userId=${userId}&roomId=${roomId}`
      `https://holiday-swap.click/api/v1/available-times/co-owner/${coOwnerId}?pageNo=${pageNo}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortBy=${sortBy}`
    );

    if (!approveDetail) {
      return null;
    }
    return approveDetail.data;
  } catch (error) {}
}
