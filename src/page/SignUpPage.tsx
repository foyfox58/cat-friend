import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim(),
            password: !formData.password.trim(),
            confirmPassword: formData.password !== formData.confirmPassword
        };

        setErrors(newErrors);

        const isValid = !Object.values(newErrors).some(error => error);

        if (isValid) {
            console.log("ลงทะเบียนด้วย:", formData);
            navigate("/sign-up/success");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#EFEEEB]">
            <main className="flex justify-center items-center p-4 min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
                        Sign up
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-muted-foreground"
                            >
                                Full Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full ${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">Please enter your full name</p>
                            )}
                        </div>

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
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className={`w-full ${errors.password ? "border-red-500" : ""}`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs">Please enter your password</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-muted-foreground"
                            >
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className={`w-full ${errors.confirmPassword ? "border-red-500" : ""}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs">Passwords do not match</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            Sign up
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link to="/login" className="font-semibold underline">
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
