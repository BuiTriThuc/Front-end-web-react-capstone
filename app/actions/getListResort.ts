import axios from 'axios';

export default async function GetListResort(pageNo: string, config: any = {}) {
  try {
    const { resortName } = config;

    let apiUrl = `https://holiday-swap.click/api/v1/resorts?pageNo=${pageNo}&pageSize=999`;

    if (resortName) {
      apiUrl += `&nameResort=${resortName}`;
    }
    const listResort = await axios.get(apiUrl);

    if (!listResort) {
      return null;
    }

    return listResort.data;
  } catch (error) {}
}
