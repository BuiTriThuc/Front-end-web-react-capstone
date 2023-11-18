import AxiosClient from '@/app/libs/AxiosConfig';
import { InRoomAmenityTypeResponse } from '@/app/components/map/type';

const InRoomAmenityTypeApis = {
  getAll: (): Promise<InRoomAmenityTypeResponse> => AxiosClient.get('/in-room-amenity-types?pageNo=0&pageSize=10&sortBy=id'),
};

export default InRoomAmenityTypeApis;