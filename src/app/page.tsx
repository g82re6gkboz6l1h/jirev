// src/app/page.tsx
import { getAllPosts } from '@/lib/posts';
import HomeClient from './HomeClient';

export default function Page() {
  const posts = getAllPosts();
  return <HomeClient posts={posts} />;
}
