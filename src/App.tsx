import './App.css'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import LatestArticles from './components/LatestArticles'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <HeroSection />
      <LatestArticles />
      <Footer />
    </div>
  )
}
