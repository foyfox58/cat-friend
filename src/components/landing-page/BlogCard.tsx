import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
  id: number | string;
  image?: string;
  category?: string;
  title: string;
  description: string;
  author: string;
  date: string;
  avatar?: string;
};

function BlogCard({
  id,
  image,
  category,
  title,
  description,
  author,
  date,
  avatar,
}: BlogCardProps) {
  const navigate = useNavigate();

  const avatarUrl =
    avatar ||
    "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg";

  const goToPost = () => {
    navigate(`/post/${id}`);
  };

  return (
    <article className="blog-card">
      {/* ✅ Image clickable */}
      {image?.trim() && (
        <div className="blog-card__image" onClick={goToPost}>
          <img src={image} alt={title || "blog image"} />
        </div>
      )}

      <div className="blog-card__content">
        {category && (
          <span className="blog-card__category">{category}</span>
        )}

        {/* ✅ Title clickable */}
        <h3 className="blog-card__title" onClick={goToPost}>
          {title}
        </h3>

        <p className="blog-card__description">{description}</p>

        <div className="blog-card__meta">
          <img
            src={avatarUrl}
            alt={author}
            className="blog-card__avatar"
          />
          <span className="blog-card__author">{author}</span>
          <span className="blog-card__separator">|</span>
          <span className="blog-card__date">
            {new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
