import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

async function getAllTags() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const tagCount: Record<string, number> = {};

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    if (data.tags && Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }
  }

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">All Tags</h1>
      <div className="flex gap-3 flex-wrap">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-2 bg-neutral-800 text-neutral-300 rounded hover:bg-[#db0042] hover:text-white transition-colors"
          >
            {tag} <span className="text-xs text-neutral-400">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
