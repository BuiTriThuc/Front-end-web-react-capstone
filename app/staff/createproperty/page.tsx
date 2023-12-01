import GetPropertyType from '@/app/actions/getPropertyType';
import CreateProperty from './CreateProperty';
import GetPropertyView from '@/app/actions/getPropertyView';
import GetInRoomAmenities from '@/app/actions/getInRoomAmenities';
import requireAuth from '@/app/libs/requireAuth';
import GetListResort from '@/app/actions/getListResortForCreate';

export const metadata = {
  title: 'Create Property',
};

export default async function CreatePropertyPage() {
  const propertyTypes = await GetPropertyType();
  const propertyViews = await GetPropertyView();
  const inRoomAmenities = await GetInRoomAmenities();
  const listResort = await GetListResort('0');

  return requireAuth(
    <CreateProperty
      propertyTypes={propertyTypes}
      propertyViews={propertyViews}
      inRoomAmenities={inRoomAmenities}
      listResort={listResort}
    />,
    [3]
  );
}
