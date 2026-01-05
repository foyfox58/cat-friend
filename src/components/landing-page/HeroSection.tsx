import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left: Headline & description */}
        <div className="hero-text">
        <h1 className="hero-title">
            <span className="line">Stay</span>
            <span className="line">Informed,</span>
            <span className="line">Stay Inspired</span>
        </h1>
          
          <p className="hero-description">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration
            and Information.
          </p>
        </div>

        {/* Center: Image card */}
        <div className="hero-image-card">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt="Man with cat on shoulder in autumn setting"
            className="hero-image"
          />
        </div>

        {/* Right: Author info */}
        <div className="hero-author">
          <div className="author-label">-Author</div>
          <h2 className="author-name">Thompson P.</h2>
          <p className="author-text">
            I am a pet enthusiast and freelance writer who specializes in animal behavior and
            care. With a deep love for cats, I enjoy sharing insights on feline companionship and
            wellness.
          </p>
          <p className="author-text">
            When I&apos;m not writing, I spends time volunteering at my local animal shelter,
            helping cats find loving homes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection