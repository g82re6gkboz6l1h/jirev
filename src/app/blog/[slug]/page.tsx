import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import Link from "next/link";
import ShareButtons from "./ShareButtons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mdev
                </h1>
                <p className="text-xs text-gray-500">
                  Modern Development Technologies
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">{post.category}</span>
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm">
                {(() => {
                  const date = new Date(post.date);
                  return !isNaN(date.getTime())
                    ? format(date, "MMMM dd, yyyy")
                    : "—";
                })()}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-blue-100">By {post.author}</p>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-64 -translate-x-64"></div>
        </div>
      </section>

      {/* Blog Post */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className="mx-3">•</span>
            <span>
              {(() => {
                const date = new Date(post.date);
                return !isNaN(date.getTime())
                  ? format(date, "MMMM dd, yyyy")
                  : "—";
              })()}
            </span>
            <span className="mx-3">•</span>
            <span>By {post.author}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600">{post.excerpt}</p>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Share Section */}
        <ShareButtons title={post.title} />
      </article>

      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-20">
        © 2024 Mdev. All rights reserved.
      </footer>
    </div>
  );
}
