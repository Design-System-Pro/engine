import { getPost, getAllPosts } from '@/utils/mdx';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <article className="prose prose-sm sm:prose lg:prose-lg">
          <h1 className="mb-8 text-4xl font-bold">{post.title}</h1>
          <div className="text-gray-600 mb-8">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          {post.content}
        </article>
      </div>
    </>
  );
}
