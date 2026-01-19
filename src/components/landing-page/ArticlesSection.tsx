import { useEffect, useState } from "react";
import axios from "axios";
import "./LatestArticles.css";
import BlogCard from "./BlogCard";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const BASE_URL = "https://blog-post-project-api.vercel.app";
const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticlesSection() {
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const params: any = {
        page,
        limit: 6,
      };

      if (category !== "Highlight") {
        params.category = category;
      }

      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }

      const res = await axios.get(`${BASE_URL}/posts`, { params });
      const newPosts = res.data.posts || [];

      setPosts((prev) => [...prev, ...newPosts]);

      if (res.data.currentPage >= res.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ โหลดเพิ่มเมื่อ page หรือ category เปลี่ยน
  useEffect(() => {
    fetchPosts();
  }, [page, category]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleChangeCategory = (value: string) => {
    if (value === category) return;

    setCategory(value);
    setPosts([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <section className="latest-articles">
      {/* FILTER BAR */}
      <div className="filter-bar">
        {/* Desktop */}
        <div className="category-list">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant="ghost"
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

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPosts([]);
              setPage(1);
              setHasMore(true);
            }}
          />
          <Search size={16} />
        </div>

        {/* Mobile */}
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

      {/* GRID */}
      {posts.length > 0 && (
        <div className="latest-articles__grid">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
              avatar={post.avatar}
            />
          ))}
        </div>
      )}

      {/* LOAD MORE */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="hover:text-muted-foreground font-medium underline"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}

export default ArticlesSection;
