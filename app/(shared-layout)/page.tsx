import DarkVeil from "@/components/ui/DarkVeil";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";


export default function HomePage() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-transparent text-foreground px-6 z-10 pt-20">
            <div className="hidden lg:flex absolute inset-0 -z-10">
                <DarkVeil />
            </div>
            <h1 className="text-5xl font-bold mb-4 z-10">
                Welcome to <span className="text-blue-500">ByteLog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
                Explore insights, tutorials, and the latest trends in software
                development. Built for developers, by developers.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/blog"
                    className={buttonVariants({ variant: "default",className: "px-6 py-4 text-xl " })}
                >
                    Read Blog
                </Link>
                <Link
                    href="/create"
                    className={buttonVariants({ variant: "outline",className: "px-6 py-4 text-xl" })}
                >
                    Create
                </Link>
            </div>
        </section>
    );
}
