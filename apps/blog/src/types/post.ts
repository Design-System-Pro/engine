export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: React.ReactNode;
}

export type PostPreview = Omit<Post, 'content'>;
