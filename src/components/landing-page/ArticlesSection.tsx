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

  // 1. จัดการเมื่อ Filter เปลี่ยน (Category หรือ Keyword)
  useEffect(() => {
    setPage(1);
    setPosts([]); // ล้างข้อมูลหน้าจอทันทีเมื่อเปลี่ยนเงื่อนไข
    setHasMore(true);
  }, [category, keyword]);

  // 2. จัดการการ Fetch ข้อมูล
  useEffect(() => {
    let isIgnore = false;

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
        
        if (!isIgnore) {
          const newPosts = res.data.posts || [];
          
          setPosts((prev) => {
            // ถ้าเป็นหน้า 1 ให้ใช้ข้อมูลใหม่เลย ไม่เอาไปต่อท้ายของเก่า
            return page === 1 ? newPosts : [...prev, ...newPosts];
          });

          // เช็คว่ายังมีหน้าต่อไปไหม
          setHasMore(res.data.currentPage < res.data.totalPages);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        if (!isIgnore) setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      isIgnore = true; // Cleanup function ป้องกันข้อมูลซ้ำซ้อน
    };
  }, [page, category, keyword]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleChangeCategory = (value: string) => {
    if (value === category) return;
    setCategory(value);
  };

  return (
    <section className="latest-articles">
      <div className="filter-bar">
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

   
      <div className="latest-articles__grid">
        {posts.map((post, index) => (
          // ใช้ id ร่วมกับ index เพื่อป้องกัน key ซ้ำกรณีฉุกเฉิน
          <BlogCard key={`${post.id}-${index}`} {...post} />
        ))}
      </div>

      {/* ส่วนปุ่ม View More จะอยู่ล่างสุดเสมอ */}
      {hasMore && posts.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="hover:text-muted-foreground font-medium underline"
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          No articles found.
        </div>
      )}
    </section>
  );
}

export default ArticlesSection;