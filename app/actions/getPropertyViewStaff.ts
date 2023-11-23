import axios from 'axios';

export default async function GetPropertyViewStaff() {
  try {
    const propertyViews = await axios.get(
      `${process.env.API_URL}/property-view?pageNo=0&pageSize=10&sortDirection=desc&sortBy=id`
    );

    if (!propertyViews) {
      return null;
    }

    return propertyViews.data;
  } catch (error) {}
}
