import "./LatestArticles.css";
import { Search } from "lucide-react";

// import shadcn select components
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select"; // ปรับ path ตามโปรเจกต์คุณ

function LatestArticles() {
  return (
    <section className="latest-articles">
      <h2 className="section-title">Latest articles</h2>

      <div className="filter-bar">
        {/* Desktop category buttons */}
        <div className="category-list">
          <button className="category active">Highlight</button>
          <button className="category">Cat</button>
          <button className="category">Inspiration</button>
          <button className="category">General</button>
        </div>

        {/* Search box */}
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <Search className="search-icon" />
        </div>

        {/* Mobile select */}
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
    </section>
  );
}

export default LatestArticles;
