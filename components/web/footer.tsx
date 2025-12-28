"use client"
export default function Footer() {
    return (
        <footer className="w-full  bg-[linear-gradient(135deg,#1b0066_0%,#3a00b0_40%,#6a00c9_100%)] backdrop-blur-xl backdrop-saturate-150 border-t border-white/10 py-6 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-gray-200 text-sm">
                <p className="text-center md:text-left mb-4 md:mb-0">
                    © {new Date().getFullYear()} <span className="text-white font-semibold">ByteLog</span>. All rights reserved.
                </p>
                <div className="flex gap-6">

                    <a href="/blog" className="hover:text-blue-400 transition">Blog</a>
                    <a href="/create" className="hover:text-blue-400 transition">Create</a>

                </div>
            </div>
        </footer>
    );
}
