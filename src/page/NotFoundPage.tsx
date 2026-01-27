import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}
