import BlogCard from "./BlogCard";
import "./BlogSection.css";
import { blogPosts } from "../../data/blogPosts";

function BlogSection() {
    return (
      <section className="blog-section">
        <div className="latest-articles__grid">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
  
        <div className="blog-view-more">
          <a href="/blog">View more</a>
        </div>
      </section>
    );
  }
  export default BlogSection