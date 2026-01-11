import './App.css'
import NavBar from './components/landing-page/NavBar'
import HeroSection from './components/landing-page/HeroSection'
import LatestArticles from './components/landing-page/LatestArticles'
import Footer from './components/landing-page/Footer'
import BlogCard from './components/landing-page/BlogCard'
import BlogSection from './components/landing-page/BlogSection'
import ArticlesSection from './components/landing-page/ArticlesSection'


export default function App() {
  return (
    <div className="app">
      <NavBar />
      <HeroSection />
      <ArticlesSection />
      <BlogSection />
      <Footer />
      

    </div>
  )
}
