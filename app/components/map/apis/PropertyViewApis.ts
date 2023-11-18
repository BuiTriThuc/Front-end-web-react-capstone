import AxiosClient from '@/app/libs/AxiosConfig';
import { PropertyViewResponse } from '@/app/components/map/type';

const PropertyViewApis = {
  getAll: (): Promise<PropertyViewResponse> => AxiosClient.get('/property-view?pageNo=0&pageSize=10&sortBy=id'),
};

export default PropertyViewApis;