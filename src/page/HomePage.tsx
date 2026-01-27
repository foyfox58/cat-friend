import NavBar from "@/components/landing-page/NavBar";
import HeroSection from "@/components/landing-page/HeroSection";
import ArticlesSection from "@/components/landing-page/ArticlesSection";
import Footer from "@/components/landing-page/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="grow">
        <HeroSection />
        <ArticlesSection />
      </div>
      <Footer />
    </div>
  );
}

