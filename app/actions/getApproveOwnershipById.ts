import axios from 'axios';

interface IParams {
  slug: any[];
}

export default async function GetApproveOwnershipById(params: IParams) {
  try {
    const { slug } = params; // Destructure the slug array from params.
    const [propertyId, userId, roomId] = slug;
    const [coOwnerId ] = slug;

    const approveDetail = await axios.get(
      // `https://holiday-swap.click/api/co-owners/detail?propertyId=${propertyId}&userId=${userId}&roomId=${roomId}`
      `https://holiday-swap.click/api/co-owners/${coOwnerId}`

    );

    if (!approveDetail) {
      return null;
    }

    return approveDetail.data;
  } catch (error) {}
}
