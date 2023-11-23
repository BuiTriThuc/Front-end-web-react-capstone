import HomePage from './HomePage';
import GetListResort from './actions/getListResort';

export default async function Home() {
  const listResort = await GetListResort('0');
  return <HomePage listResort={listResort} />;
}
