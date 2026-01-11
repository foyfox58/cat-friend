import "./LatestArticles.css";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticlesSection() {
  return (
    <section className="latest-articles">
      <h2 className="section-title">Latest articles</h2>

      <div className="filter-bar">

        {/* Desktop Category */}
        <div className="hidden md:flex space-x-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              size="sm"
              variant="ghost"
              className="rounded-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <Search className="search-icon" />
        </div>

        {/* Mobile Category */}
        <div className="category-mobile">
          <label className="category-label">Category</label>

          <Select defaultValue="highlight">
            <SelectTrigger className="mobile-select-trigger">
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem
                  key={index}
                  value={category.toLowerCase()}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>
    </section>
  );
}

export default ArticlesSection;
