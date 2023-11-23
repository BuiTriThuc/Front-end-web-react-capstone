import axios from 'axios';

interface ModelUpdate {
  propertyTypeName: string;
  propertyTypeDescription: string;
}

const UpdatePropertyTypeStaff = async (id: number, modelUpdate: ModelUpdate): Promise<any> => {
  let data = JSON.stringify(modelUpdate);

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://holiday-swap.click/api/v1/property-types/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default UpdatePropertyTypeStaff;
