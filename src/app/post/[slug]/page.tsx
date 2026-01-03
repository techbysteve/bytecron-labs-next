import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import { CodeBlock } from "@/components/code-block";
import { MDXImage } from "@/components/mdx-image";
import { ScrambleText } from "@/components/scramble-text";
import { CommentsSection } from "@/components/comments-section";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost(slug: string) {
  const contentDir = path.join(process.cwd(), "content");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.frontmatter.description,
    authors: post.frontmatter.author
      ? [{ name: post.frontmatter.author }]
      : undefined,
  };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="text-sm text-[#b2b2b2]">
          <ScrambleText text={post.frontmatter.date} />
          {post.frontmatter.author && (
            <>
              <span className="ml-2">•</span>
              <ScrambleText text={post.frontmatter.author} className="ml-2" />
            </>
          )}
        </div>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {post.frontmatter.tags.map((tag: string) => (
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
      </header>

      <div className="prose prose-neutral max-w-none">
        <MDXRemote
          source={post.content}
          components={{
            img: MDXImage,
            pre: CodeBlock,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    keepBackground: false,
                  },
                ],
                rehypeKatex,
              ],
            },
          }}
        />
      </div>

      <CommentsSection />
    </article>
  );
}
