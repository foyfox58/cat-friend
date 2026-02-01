import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SignUpSuccessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#EFEEEB]">
            <main className="flex justify-center items-center p-4 min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="w-20 h-20 text-green-500" />
                    </div>

                    <h2 className="text-3xl font-bold mb-4 text-foreground">
                        Sign up successful!
                    </h2>

                    <p className="text-muted-foreground mb-8">
                        Welcome! You can now log in to your account
                    </p>

                    <div className="space-y-4">
                        <Link to="/login" className="block">
                            <Button className="w-full rounded-full bg-black text-white hover:bg-gray-800">
                                Log in
                            </Button>
                        </Link>

                        <Link to="/" className="block">
                            <Button variant="outline" className="w-full rounded-full">
                                Back to home
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
