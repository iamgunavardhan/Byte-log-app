import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import CreateClient from "@/components/web/CreateClient";




export default async function CreateRoute() {
    const token = await getToken();

    if (!token) {
        redirect("/auth/login");
    }

    return <CreateClient />;
}
