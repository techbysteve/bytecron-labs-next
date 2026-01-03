import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

async function getPostsByTag(tag: string) {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const posts = [];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    if (data.tags && Array.isArray(data.tags) && data.tags.includes(tag)) {
      posts.push({
        slug: file.replace(".mdx", ""),
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const tags = new Set<string>();

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    if (data.tags && Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        tags.add(tag);
      }
    }
  }

  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/tags"
          className="text-sm text-[#b2b2b2] hover:text-[#db0042] transition-colors mb-2 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          All Tags
        </Link>
        <h1 className="text-4xl font-bold">
          Posts tagged with &quot;{tag}&quot;
        </h1>
        <p className="text-[#b2b2b2] mt-2">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="pb-6">
            <Link href={`/posts/${post.slug}`} className="group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#db0042] transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="text-sm text-[#b2b2b2] mb-2">{post.date}</div>
            {post.description && (
              <p className="text-[#b2b2b2] mb-3">{post.description}</p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((postTag: string) => (
                  <Link
                    key={postTag}
                    href={`/tags/${postTag}`}
                    className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded hover:bg-[#db0042] hover:text-white transition-colors"
                  >
                    {postTag}
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
