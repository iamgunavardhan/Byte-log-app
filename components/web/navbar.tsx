"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/web/SearchInput";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav  className="fixed top-0 left-0  w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between z-50
  bg-white/5 dark:bg-black/10
  backdrop-blur-3xl saturate-150
  border-b border-white/10 dark:border-white/5

  transition-all duration-500" >
            {/* Left Section */}
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        Byte<span className="text-blue-500">Log</span>
                    </h1>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link className={cn(buttonVariants({ variant: "ghost" }), "text-lg")} href="/">
                        Home
                    </Link>
                    <Link className={cn(buttonVariants({ variant: "ghost" }), "text-lg")} href="/blog">
                        Blog
                    </Link>
                    <Link className={cn(buttonVariants({ variant: "ghost" }), "text-lg")} href="/create">
                        Create
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <div className="hidden lg:block mr-2">
                    <SearchInput />
                </div>

                {!isLoading && (
                    <>
                        {isAuthenticated ? (
                            <Button
                                onClick={() =>
                                    authClient.signOut({
                                        fetchOptions: {
                                            onSuccess: () => {
                                                toast.success("Logged Out");
                                                router.push("/");
                                            },
                                            onError: (error) => {
                                                toast.error(error.error.message);
                                            },
                                        },
                                    })
                                }
                                className="hidden lg:flex text-lg"
                            >
                                Logout
                            </Button>
                        ) : (
                            <div className="hidden lg:flex items-center gap-4">
                                <Link className={cn(buttonVariants(), "text-lg")} href="/auth/sign-up">
                                    Sign Up
                                </Link>
                                <Link
                                    className={cn(buttonVariants(), "text-lg")}
                                    href="/auth/login"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </>
                )}



                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-foreground ml-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-2/4
                    bg-black  border
                    shadow-lg flex flex-col items-start py-6 space-y-4
                    lg:hidden animate-in fade-in-50 z-50 px-4 rounded-2xl">
                    <SearchInput />
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-lg hover:text-blue-500"
                    >
                        Home
                    </Link>
                    <Link
                        href="/blog"
                        onClick={() => setMenuOpen(false)}
                        className="text-lg hover:text-blue-500"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/create"
                        onClick={() => setMenuOpen(false)}
                        className="text-lg hover:text-blue-500"
                    >
                        Create
                    </Link>

                    {!isLoading && (
                        <>
                            {isAuthenticated ? (
                                <Button
                                    onClick={() =>
                                        authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => {
                                                    toast.success("Logged Out");
                                                    router.push("/");
                                                    setMenuOpen(false);
                                                },
                                                onError: (error) => {
                                                    toast.error(error.error.message);
                                                },
                                            },
                                        })
                                    }
                                    className="text-lg"
                                >
                                    Logout
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2 w-full">
                                    <Link
                                        className="text-lg hover:text-blue-500"
                                        href="/auth/sign-up"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        className="text-lg hover:text-blue-500"
                                        href="/auth/login"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
