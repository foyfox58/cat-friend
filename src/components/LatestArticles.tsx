import "./LatestArticles.css";
import { Search } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

function LatestArticles() {
  return (
    <section className="latest-articles">
      <h2 className="section-title">Latest articles</h2>

      <div className="filter-bar">

        {/* Desktop category tabs */}
<Tabs defaultValue="highlight" className="category-list">
  <TabsList className="bg-transparent p-0 gap-2">
    <TabsTrigger
      value="highlight"
      className="
        bg-transparent
        shadow-none
        data-[state=active]:bg-white
        data-[state=active]:text-black
      "
    >
      Highlight
    </TabsTrigger>

    <TabsTrigger
      value="cat"
      className="
        bg-transparent
        shadow-none
        data-[state=active]:bg-white
        data-[state=active]:text-black
      "
    >
      Cat
    </TabsTrigger>

    <TabsTrigger
      value="inspiration"
      className="
        bg-transparent
        shadow-none
        data-[state=active]:bg-white
        data-[state=active]:text-black
      "
    >
      Inspiration
    </TabsTrigger>

    <TabsTrigger
      value="general"
      className="
        bg-transparent
        shadow-none
        data-[state=active]:bg-white
        data-[state=active]:text-black
      "
    >
      General
    </TabsTrigger>
  </TabsList>
</Tabs>

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
