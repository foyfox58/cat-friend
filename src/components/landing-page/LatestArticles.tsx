import "./LatestArticles.css";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogPosts } from "../../data/blogPosts";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

function LatestArticles() {
  return (
    <section className="latest-articles">
      <h2 className="section-title">Latest articles</h2>

      {/* ================= Filter Bar ================= */}
      <div className="filter-bar">
        {/* Desktop category */}
        <Tabs defaultValue="highlight" className="category-list">
          <TabsList className="bg-transparent p-0 gap-2">
            <TabsTrigger value="highlight">Highlight</TabsTrigger>
            <TabsTrigger value="cat">Cat</TabsTrigger>
            <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <Search className="search-icon" />
        </div>

        {/* Mobile category */}
        <div className="category-mobile">
          <label className="category-label">Category</label>
          <Select defaultValue="highlight">
            <SelectTrigger className="mobile-select-trigger">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highlight">Highlight</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ================= Articles ================= */}
      <div className="articles-two-column">
        {blogPosts.map((post) => (
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

export default LatestArticles;
