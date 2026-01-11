import { useState } from "react";
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
  const [category, setCategory] = useState("Highlight");

  return (
    <section className="latest-articles">
      <h2 className="section-title">Latest articles</h2>

      <div className="filter-bar">

        {/* Desktop Category */}
        <div className="hidden md:flex space-x-2">
          {categories.map((categoryItem, index) => {
            const isSelected = category === categoryItem;
            return (
              <Button
                key={index}
                size="sm"
                variant="ghost"
                className={`category-filter-btn ${
                  isSelected ? "category-filter-btn-selected" : "category-filter-btn-unselected"
                }`}
                disabled={isSelected}
                onClick={() => setCategory(categoryItem)}
              >
                {categoryItem}
              </Button>
            );
          })}
        </div>

        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <Search className="search-icon" />
        </div>

        {/* Mobile Category */}
        <div className="category-mobile">
          <label className="category-label">Category</label>

          <Select 
            value={category.toLowerCase()} 
            onValueChange={(value) => setCategory(value.charAt(0).toUpperCase() + value.slice(1))}
          >
            <SelectTrigger className="mobile-select-trigger">
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((categoryItem, index) => (
                <SelectItem
                  key={index}
                  value={categoryItem.toLowerCase()}
                >
                  {categoryItem}
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
