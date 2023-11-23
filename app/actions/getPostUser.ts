import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export default async function GetPostUser() {
  try {
    const post = await axios.get(`https://holiday-swap.click/api/post/get`);

    if (!post) {
      return null;
    }

    return post.data;
  } catch (error) {}
}
