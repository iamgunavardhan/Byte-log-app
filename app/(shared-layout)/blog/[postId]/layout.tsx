import React from "react";

export default function PostIdLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-3xl mx-auto w-full">
            {children}
        </div>
    );
}
