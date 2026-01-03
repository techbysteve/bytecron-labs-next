import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { ScrambleText } from "@/components/scramble-text";

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  published: boolean;
};

async function getPosts() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || [],
        author: data.author,
        published: data.published ?? false,
      } as Post;
    })
    .filter((post) => post.published);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="pb-6 ">
            <Link href={`/post/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#db0042] transition-colors">
                {post.title}
              </h2>
            </Link>

            <div className="text-sm text-[#b2b2b2] mb-2">
              <ScrambleText text={post.date} />

              {post.author && (
                <ScrambleText className="ml-2" text={post.author} />
              )}
            </div>

            <p className="text-[#b2b2b2] mb-3">{post.excerpt}</p>

            {post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded hover:bg-[#db0042] hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
