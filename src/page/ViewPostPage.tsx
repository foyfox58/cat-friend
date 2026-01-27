import NavBar from "@/components/landing-page/NavBar";
import Footer from "@/components/landing-page/Footer";
import ViewPost from "@/components/landing-page/ViewPostPage";

export default function ViewPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="grow">
        <ViewPost />
      </div>
      <Footer />
    </div>
  );
}

