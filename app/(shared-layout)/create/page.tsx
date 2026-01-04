import {redirect} from "next/navigation";
import {getToken} from "@/lib/auth-server";
import CreateClient from "@/app/(shared-layout)/create/CreateClient";

export default async function CreatePage() {
    const token = await getToken();

    if (!token) {
        redirect("/auth/login");
    }

    return <CreateClient />;
}