import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (!email.trim()) {
      setIsErrorEmail(true);
      valid = false;
    } else {
      setIsErrorEmail(false);
    }

    if (!password.trim()) {
      setIsErrorPassword(true);
      valid = false;
    } else {
      setIsErrorPassword(false);
    }

    if (valid) {
      console.log("Logging in with:", { email, password });
      login(email, password);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EFEEEB]">
      <main className="flex justify-center items-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Log in
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${isErrorEmail ? "border-red-500" : ""}`}
              />
              {isErrorEmail && (
                <p className="text-red-500 text-xs">Please enter a valid email</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${isErrorPassword ? "border-red-500" : ""}`}
              />
              {isErrorPassword && (
                <p className="text-red-500 text-xs">Please enter your password</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-black text-white hover:bg-gray-800"
            >
              Log in
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/sign-up" className="font-semibold underline">
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm mt-2">
              <Link to="/reset-password" className="text-xs text-muted-foreground hover:underline">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
