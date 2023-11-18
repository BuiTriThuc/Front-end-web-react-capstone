import axios from "axios";
import { InRoomAmenityTypeResponse } from '@/app/components/map/type';

export default async function GetInRoomAmenityType() {
  try {
    const inRoomAmenityType = await axios.get(
      `${process.env.API_URL}/in-room-amenity-types?pageNo=0&pageSize=10&sortBy=id`
    );

    if (!inRoomAmenityType) {
      return null;
    }

    return inRoomAmenityType.data as InRoomAmenityTypeResponse;
  } catch (error) {}
}
