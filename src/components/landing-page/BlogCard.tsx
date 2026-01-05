import "./BlogCard.css";

type BlogCardProps = {
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
};

function BlogCard({
  image,
  category,
  title,
  description,
  author,
  date,
}: BlogCardProps) {
  // Avatar แบบ fixed ตามโค้ดตัวอย่าง
  const avatarUrl = "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg";

  return (
    <article className="blog-card">
      {/* ถ้าใน Design จริงไม่มีรูปใหญ่ด้านบน สามารถ comment ส่วนนี้ออกได้ครับ */}
      {image && (
        <div className="blog-card__image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="blog-card__content">
        {/* category อาจจะซ่อนไว้ถ้าในรูปตัวอย่างไม่มี */}
        {/* <span className="blog-card__category">{category}</span> */}

        <h3 className="blog-card__title">{title}</h3>

        <p className="blog-card__description">{description}</p>

        {/* ส่วนข้อมูลผู้เขียนและวันที่ */}
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