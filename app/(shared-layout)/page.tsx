import DarkVeil from "@/components/ui/DarkVeil";


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
                <a
                    href="/blog"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition"
                >
                    Read Our Blog
                </a>
                <a
                    href="/create"
                    className="border border-blue-500 text-blue-500 px-6 py-3 rounded-md font-medium hover:bg-blue-500 hover:text-white transition"
                >
                    Create a Post
                </a>
            </div>
        </section>
    );
}
