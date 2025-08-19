"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Content = {
  _id: string;
  title: string;
  type: string;
  link: string;
  tags: string[];
};

export default function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const tag = searchParams.get("tag");
        const response = await fetch(
          tag ? `/api/content?tag=${tag}` : "/api/content"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const data = await response.json();
        setContents(data);
      } catch (err) {
        setError("Failed to load content");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [searchParams]);

  const handleTagClick = (tag: string) => {
    router.push(`/dashboard/home?tag=${tag}`);
  };

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">
        Your Second Brain 🧠
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contents.length > 0 ? (
          contents.map((content) => (
            <div
              key={content._id}
              className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500 transition-colors shadow-md"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {content.title}
              </h2>
              <p className="text-gray-400 mb-2">Type: {content.type}</p>
              <a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline mb-3 inline-block"
              >
                Visit Link
              </a>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No content found.</p>
        )}
      </div>
    </div>
  );
}
