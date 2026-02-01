import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBar from "@/components/landing-page/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { User, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        username: "moodeng.cute", // Mock data
        email: user?.email || "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Update form data when user context changes
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name,
                email: user.email
            }));
        }
    }, [user]);

    const isActive = (path: string) => location.pathname === path;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update user context
        updateUser({ name: formData.name });

        console.log("Update profile:", formData);

        toast.custom((t) => (
            <div className="bg-[#10B981] text-white p-5 rounded-lg shadow-xl flex justify-between items-center w-full max-w-md">
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-lg">Saved profile</h3>
                    <p className="text-sm opacity-90">Your profile has been successfully updated</p>
                </div>
                <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        ), {
            position: 'bottom-right',
            duration: 4000
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Update user avatar in context
                updateUser({ avatar: base64String });
                toast.success("Profile picture updated!");
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
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
                                <Avatar className="w-24 h-24 shadow-md">
                                    <AvatarImage src={user?.avatar || "/moodeng.jpg"} alt="Profile" />
                                    <AvatarFallback className="text-2xl bg-gray-200">{user?.name?.charAt(0) || "M"}</AvatarFallback>
                                </Avatar>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <Button
                                    variant="outline"
                                    className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-5"
                                    onClick={triggerFileInput}
                                >
                                    Upload profile picture
                                </Button>
                            </div>

                            <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-500">
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-[#FBFBFA] border-gray-100 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="username" className="text-sm font-medium text-gray-500">
                                        Username
                                    </label>
                                    <Input
                                        id="username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="bg-[#FBFBFA] border-gray-100 focus:bg-white h-12 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-500">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-[#FBFBFA] border-gray-100 text-gray-400 h-12 rounded-xl cursor-not-allowed opacity-60"
                                        disabled
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="px-10 py-6 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-all text-base font-semibold"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
