import { remark } from "remark";
import html from "remark-html";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
}

// Normalize date safely for production
function normalizeDate(value: unknown): string {
  if (!value) return "";

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? "" : d.toISOString();
  }

  return "";
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title ?? "",
        date: normalizeDate(data.date),
        author: data.author ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "",
        image: data.image ?? "",
        content,
      };
    })
    .filter((post) => post.slug && post.title);

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);

    return {
      slug,
      title: data.title ?? "",
      date: normalizeDate(data.date),
      author: data.author ?? "",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "",
      image: data.image ?? "",
      content: processedContent.toString(),
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}
