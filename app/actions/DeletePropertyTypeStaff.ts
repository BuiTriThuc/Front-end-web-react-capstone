import axios from 'axios';

const DeletePropertyTypeStaff = async (id: number): Promise<any> => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://holiday-swap.click/api/v1/property-types/${id}`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    console.log(response.data);
    if (!response.data) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default DeletePropertyTypeStaff;
