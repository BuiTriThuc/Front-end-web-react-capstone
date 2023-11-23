import axios from 'axios';

interface IParams {
  propertyId: any;
  roomId: any;
}

export default async function GetApartmentRating(params: IParams) {
  try {
    const { propertyId, roomId } = params;
    const apartmentRating = await axios.get(
      `${process.env.API_URL}/rating?propertyId=${propertyId}&roomId=${roomId}&pageNo=0&pageSize=10&sortDirection=asc&sortBy=id`
    );

    if (!apartmentRating) {
      return null;
    }

    return apartmentRating.data;
  } catch {}
}
