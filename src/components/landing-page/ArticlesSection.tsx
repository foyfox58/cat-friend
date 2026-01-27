import { useEffect, useState } from "react";
import axios from "axios";
import "./LatestArticles.css";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";
import { Search, Loader2 } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const BASE_URL = "https://blog-post-project-api.vercel.app";
const categories = ["Highlight", "Cat", "Inspiration", "General"];

type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  avatar?: string;
};

function ArticlesSection() {
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState<Post[]>([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 🔁 reset เมื่อเปลี่ยน filter
  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
  }, [category, keyword]);

  // 📡 fetch posts
  useEffect(() => {
    let ignore = false;

    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const params: any = {
          page,
          limit: 6,
        };

        if (category !== "Highlight") params.category = category;
        if (keyword.trim()) params.keyword = keyword.trim();

        const res = await axios.get(`${BASE_URL}/posts`, { params });

        if (!ignore) {
          const newPosts: Post[] = res.data.posts || [];

          setPosts((prev) =>
            page === 1 ? newPosts : [...prev, ...newPosts]
          );

          setHasMore(res.data.currentPage < res.data.totalPages);
        }
      } catch (error) {
        console.error("Fetch posts error:", error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, [page, category, keyword]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleChangeCategory = (value: string) => {
    if (value !== category) setCategory(value);
  };

  return (
    <div className="w-full max-w-full mx-auto md:px-6 lg:px-8 mb-20">
      <section className="latest-articles">
        {/* 🔍 Filter Bar */}
        <div className="filter-bar">
          <div className="category-list">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant="ghost"
                disabled={isLoading}
                className={
                  category === cat
                    ? "category-filter-btn-selected"
                    : "category-filter-btn-unselected"
                }
                onClick={() => handleChangeCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Search size={16} />
          </div>

          <div className="category-mobile">
            <label className="category-label">Category</label>
            <Select value={category} onValueChange={handleChangeCategory}>
              <SelectTrigger className="mobile-select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 🔄 Loading (ตอนเปลี่ยน Category / Search) */}
        {isLoading && page === 1 && (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="w-12 h-12 animate-spin text-foreground" />
            <p className="mt-4">Loading...</p>
          </div>
        )}

        {/* 📰 Articles Grid */}
        {!isLoading && (
          <div className="latest-articles__grid">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}

        {/* ⬇️ Load More */}
        {hasMore && posts.length > 0 && (
          <div className="text-center mt-20">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className={`font-medium ${
                !isLoading ? "underline hover:text-muted-foreground" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p className="mt-2">Loading...</p>
                </div>
              ) : (
                "View more"
              )}
            </button>
          </div>
        )}

        {/* ❌ ไม่พบข้อมูล */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No articles found.
          </div>
        )}
      </section>
    </div>
  );
}

export default ArticlesSection;
