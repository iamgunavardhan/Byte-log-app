
import Navbar from "@/components/web/navbar";
import React, {Suspense} from "react";
import Footer from "@/components/web/footer";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className=" flex-1 flex flex-col w-full">
                {children}
            </main>
            <Suspense fallback={<div className="text-center text-sm py-4 opacity-70">Loading footer...</div>}>
                <Footer />
            </Suspense>
        </div>
    );
}

