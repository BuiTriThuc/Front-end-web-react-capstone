import axios from 'axios';

interface IParams {
  coOwnerId: number;
}

export default async function getTimeHasBookedByCoOwnerId(params: IParams) {
  try {
    // Destructure the slug array from params.
    const { coOwnerId } = params;

    const availableTimes = await axios.get(
      `http://localhost:8080/api/booking/timeHasBooked/${coOwnerId} `
    );

    if (!availableTimes) {
      return null;
    }

    return availableTimes.data;
  } catch (error) {}
}
