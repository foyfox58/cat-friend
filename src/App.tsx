import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./page/HomePage";
import ViewPostPage from "./page/ViewPostPage";
import NotFoundPage from "./page/NotFoundPage";

// 👉 เพิ่ม import
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="app">
      <Router>
        {/* 👉 Toaster */}
        <Toaster
          toastOptions={{
            unstyled: true,
          }}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}
