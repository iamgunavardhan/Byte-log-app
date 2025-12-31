import { createAuth } from "@/convex/auth";
import { getToken as getTokenNextjs } from "@convex-dev/better-auth/nextjs";
import { cookies } from "next/headers";

export const getToken = async () => {
    cookies(); // force dynamic rendering
    return getTokenNextjs(createAuth);
};
