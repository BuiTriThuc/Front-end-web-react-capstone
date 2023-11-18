import AxiosClient from '@/app/libs/AxiosConfig';
import { InRoomAmenityTypeResponse, PropertyTypeResponse } from '@/app/components/map/type';

const PropertyTypeApis = {
  getAll: (): Promise<PropertyTypeResponse> => AxiosClient.get('/property-types?pageNo=0&pageSize=30&sortBy=id'),
};

export default PropertyTypeApis;