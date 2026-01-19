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
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: 1,
        limit: 6,
      };

      if (category !== "Highlight") {
        params.category = category;
      }

      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }

      const res = await axios.get(`${BASE_URL}/posts`, { params });
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, keyword]);

  return (
    <section className="latest-articles">
      {/* FILTER BAR */}
      <div className="filter-bar">
        {/* 🖥 Desktop (CSS จะซ่อนเองใน mobile) */}
        <div className="category-list">
          {categories.map((item) => (
            <Button
              key={item}
              size="sm"
              variant="ghost"
              className={
                category === item
                  ? "category-filter-btn-selected"
                  : "category-filter-btn-unselected"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* 🔍 Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search size={16} />
        </div>

        {/* 📱 Mobile category (CSS แสดงเฉพาะ mobile อยู่แล้ว) */}
        <div className="category-mobile">
          <label className="category-label">Category</label>
          <Select value={category} onValueChange={setCategory}>
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
      <div className="latest-articles__grid">
        {!loading &&
          posts.map((post) => (
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
    </section>
  );
}

export default ArticlesSection;
