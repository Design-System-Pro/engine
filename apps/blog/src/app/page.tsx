import { Bio } from '@/components/bio';
import { BlogPosts } from '@/components/blog-posts';
import { Newsletter } from '@/components/newsletter';
import { SocialLinks } from '@/components/social-links';

export default function Home() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">DS Pro</h1>
      <Bio />
      <BlogPosts />
      <Newsletter />
      <SocialLinks />
    </>
  );
}
