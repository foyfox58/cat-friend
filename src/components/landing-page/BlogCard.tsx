import "./BlogCard.css";

type BlogCardProps = {
  image?: string;
  category?: string;
  title: string;
  description: string;
  author: string;
  date: string;
  avatar?: string; // optional
};

function BlogCard({
  image,
  category,
  title,
  description,
  author,
  date,
  avatar,
}: BlogCardProps) {

  // ✅ avatar default (เหมือนที่คุณใช้ก่อนหน้า)
  const avatarUrl =
    avatar ||
    "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg";

  return (
    <article className="blog-card">
      {image?.trim() && (
        <div className="blog-card__image">
          <img src={image} alt={title || "blog image"} />
        </div>
      )}

      <div className="blog-card__content">
        {category && (
          <span className="blog-card__category">{category}</span>
        )}

        <h3 className="blog-card__title">{title}</h3>

        <p className="blog-card__description">{description}</p>

        <div className="blog-card__meta">
          <img
            src={avatarUrl}
            alt={author}
            className="blog-card__avatar"
          />
          <span className="blog-card__author">{author}</span>
          <span className="blog-card__separator">|</span>
          <span className="blog-card__date">{date}</span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;