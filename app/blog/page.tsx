import React from 'react';
import GetPostUser from '../actions/getPostUser';
import PostBlog from './PostBlog';
import GetCurrentUser from '../actions/getCurrentUser';

export default async function PostBlogPage() {
  const post = await GetPostUser();
  const currentUser = await GetCurrentUser();
  return <PostBlog post={post} currentUser={currentUser} />;
}
