import { getAllPosts } from '@/utils/mdx';

export async function BlogPosts() {
  const posts = await getAllPosts();

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold">Writing</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <a
              href={`/blog/${post.slug}`}
              className="text-lg text-primary hover:underline"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
