"use client";

import { useState } from "react";
import { Share2, Twitter, Linkedin, Link2, Check } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <>
      {/* Toast */}
      {copied && (
        <div className="fixed top-6 right-6 z-50 animate-slideDown">
          <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg">
            <Check className="h-4 w-4 text-green-400" />
            <span>Link copied to clipboard</span>
          </div>
        </div>
      )}

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share this article
        </h3>

        <div className="flex flex-wrap gap-4">
          {/* Twitter */}
          <button
            onClick={() => {
              const url = window.location.href;
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  url
                )}&text=${encodeURIComponent(title)}`,
                "_blank"
              );
            }}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => {
              const url = window.location.href;
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  url
                )}`,
                "_blank"
              );
            }}
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <Link2 className="h-4 w-4" />
            Copy Link
          </button>
        </div>
      </div>
    </>
  );
}
