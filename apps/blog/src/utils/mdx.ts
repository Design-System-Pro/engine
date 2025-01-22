import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Post, PostFrontmatter, PostPreview } from '../types/post';

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts');

export async function getPost(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');

  const { frontmatter, content } = await compileMDX<PostFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  // Validate required frontmatter fields
  if (!frontmatter.title || !frontmatter.date || !frontmatter.description) {
    throw new Error(`Missing required frontmatter fields in ${slug}.mdx`);
  }

  return {
    slug,
    content,
    ...frontmatter,
  };
}

export async function getAllPosts(): Promise<PostPreview[]> {
  const files = fs.readdirSync(POSTS_PATH);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const post = await getPost(slug);

      return post;
    })
  );

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
