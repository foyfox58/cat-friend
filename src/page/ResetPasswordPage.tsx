import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import NavBar from "@/components/landing-page/NavBar";
import { useAuth } from "@/context/AuthContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ResetPasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation logic here
        if (newPassword === confirmPassword) {
            setIsDialogOpen(true);
        }
    };

    const handleConfirmReset = () => {
        console.log("Resetting password...");
        // API call to reset password
        setIsDialogOpen(false);
        // Optional: toast success or navigate
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#EFEEEB]">
            <NavBar />
            <main className="flex justify-center p-4 pt-10 min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-5xl">
                    {/* Page Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <Avatar className="w-12 h-12 shadow-sm">
                            <AvatarImage src={user?.avatar || "/moodeng.jpg"} alt="Profile" />
                            <AvatarFallback className="bg-gray-200">{user?.name?.charAt(0) || "M"}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            <span className="text-gray-800">{user?.name || "User"}</span>
                            <span className="w-[1px] h-6 bg-gray-300"></span>
                            <span className="text-gray-500">Profile</span>
                        </h1>
                    </div>

                    <div className="flex gap-8">
                        {/* Sidebar */}
                        <aside className="w-64 flex-shrink-0">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => navigate("/profile")}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive("/profile")
                                            ? "text-black bg-transparent"
                                            : "text-gray-500 hover:text-black"
                                    )}
                                >
                                    <User size={18} />
                                    Profile
                                </button>
                                <button
                                    onClick={() => navigate("/reset-password")}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive("/reset-password")
                                            ? "text-black bg-transparent"
                                            : "text-gray-500 hover:text-black"
                                    )}
                                >
                                    <Lock size={18} />
                                    Reset password
                                </button>
                            </nav>
                        </aside>

                        {/* Content */}
                        <div className="flex-1 bg-white rounded-3xl p-12 shadow-sm">
                            <div className="flex items-center gap-6 mb-8">
                                <Avatar className="w-12 h-12 shadow-sm">
                                    <AvatarImage src={user?.avatar || "/moodeng.jpg"} alt="Profile" />
                                    <AvatarFallback className="text-lg bg-gray-200">{user?.name?.charAt(0) || "M"}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-2xl font-bold">Reset password</h2>
                            </div>

                            <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="currentPassword" className="text-sm font-medium text-gray-500">
                                        Current password
                                    </label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="bg-[#FBFBFA] border-gray-100 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="text-sm font-medium text-gray-500">
                                        New password
                                    </label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="bg-[#FBFBFA] border-gray-100 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-500">
                                        Confirm new password
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-[#FBFBFA] border-gray-100 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="px-10 py-6 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-all text-base font-semibold"
                                    >
                                        Reset password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="bg-white rounded-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-xl font-bold">Reset password</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-gray-500">
                            Do you want to reset your password?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-center sm:justify-center gap-3 mt-4">
                        <AlertDialogCancel className="mt-0 rounded-full px-8 border-gray-300">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmReset}
                            className="rounded-full px-8 bg-black text-white hover:bg-gray-800"
                        >
                            Reset
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
