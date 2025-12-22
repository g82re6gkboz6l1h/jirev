"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Search, Menu, X, ChevronRight } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
};

export default function HomeClient({ posts }: { posts: Post[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.toLowerCase();

    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Mdev
                </h1>
                <p className="text-xs text-gray-500">
                  Modern Development Technologies
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </nav>

            {/* Mobile Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <section className="mb-16 text-white rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Master Modern Development
            </h2>
            <p className="text-lg mb-6 text-blue-100">
              Web, AI, DevOps & best practices
            </p>
            <button className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Explore Articles <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>

        {/* ================= POSTS ================= */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.slice(0, 3).map((post) => (
              <article
                key={`${post.slug}-${post.date}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden
             max-w-sm mx-auto"
              >
                {/* Image */}
                <div className="relative h-54">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-3xl leading-snug font-bold text-gray-900 mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Read Article
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= LATEST POSTS ================= */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article
                key={`${post.slug}-${post.date}`}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  </div>

                  {/* Button */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 whitespace-nowrap"
                  >
                    Read <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-20">
        © 2024 Mdev. All rights reserved.
      </footer>
    </div>
  );
}
