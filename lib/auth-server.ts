import { createAuth } from "@/convex/auth";
import { getToken as getTokenNextjs } from "@convex-dev/better-auth/nextjs";
import { cookies } from "next/headers";


export const getToken = () => {
    // 🔥 This line is CRITICAL
    cookies();
    // @ts-ignore
    const auth = createAuth()
    return getTokenNextjs(createAuth);
};