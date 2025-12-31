import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Image from "next/image";
import {fetchQuery, preloadQuery} from "convex/nextjs";
import {api} from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {Separator} from "@/components/ui/separator";
import {CommentSection} from "@/components/web/CommentSection";
import {PostPresense} from "@/components/web/PostPresense";
import {getToken} from "@/lib/auth-server";
import {redirect} from "next/navigation";

interface PostIdRouteProps {
    params: Promise<{
        postId: Id<"posts">;
    }>
}
/*export const dynamic = "force-dynamic";*/

export  default async function PostIdRoute({params} : PostIdRouteProps) {
    const {postId} = await params;
    const token = await getToken();
    const [post, preloadedComments, userId] = await Promise.all([
        fetchQuery(api.posts.getPostById, {postId: postId}),
        preloadQuery(
            api.comments.getCommentsByPostId,
            {
                postId: postId
            }),
        fetchQuery(api.presence.getUserId, {}, {token})
    ])

    if(!userId) {
        return redirect("/auth/login")
    }

    if(!post) {
        return (
            <div>
                <h1 className="text-6xl font-extrabold text-red-500  py-20">No post found</h1>
            </div>
        )
    }
    return (
        <div className="px-4 sm:px-8 md:px-12 py-8 animate-in fade-in duration-500 relative pt-20">
            <Link className={buttonVariants({variant: "outline" ,className: "mb-4"})} href="/blog">
                <ArrowLeft className="size-4"/>
                Back to BLog
            </Link>

            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
                <Image src={post.imageUrl ?? "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg"} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-500"/>
            </div>

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-foreground ">
                    {post.title}
                </h1>

                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Posted on:{new Date(post._creationTime).toLocaleDateString("en-US")}</p>

                    {userId && <PostPresense roomId={post._id} userId={userId} />}
                </div>
            </div>

            <Separator className="my-8"/>

            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>

            <Separator className="my-8"/>

            <CommentSection  preloadedComments={preloadedComments}/>
        </div>
    )
}