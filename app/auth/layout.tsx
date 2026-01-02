import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import {ReactNode} from "react";


export default function AuthLayout({children}: {children: ReactNode}) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-5 left-5">
              <Link href="/" className={buttonVariants({variant: "secondary"})} >
                  <ArrowLeft className="size-4"/>
                  Go Back
              </Link>
            </div>

            <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-0">{children}</div>
        </div>
    )
}