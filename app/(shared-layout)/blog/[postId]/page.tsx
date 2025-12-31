import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { PostPresense } from "@/components/web/PostPresense";

interface PostIdRouteProps {
    params: {
        postId: Id<"posts">;
    };
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
    const { postId } = params;

    const [post, preloadedComments] = await Promise.all([
        fetchQuery(api.posts.getPostById, { postId }),
        preloadQuery(api.comments.getCommentsByPostId, { postId }),
    ]);

    if (!post) {
        return (
            <div>
                <h1 className="text-6xl font-extrabold text-red-500 py-20">
                    No post found
                </h1>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 py-8 relative pt-20">
            <Link
                className={buttonVariants({ variant: "outline", className: "mb-4" })}
                href="/blog"
            >
                <ArrowLeft className="size-4" />
                Back to Blog
            </Link>

            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
                <Image
                    src={
                        post.imageUrl ??
                        "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <p className="text-sm text-muted-foreground">
                    Posted on{" "}
                    {new Date(post._creationTime).toLocaleDateString("en-US")}
                </p>

                {/* Presence should be CLIENT-ONLY */}
                <PostPresense roomId={post._id} />
            </div>

            <Separator className="my-8" />

            <p className="text-lg whitespace-pre-wrap">{post.body}</p>

            <Separator className="my-8" />

            <CommentSection preloadedComments={preloadedComments} />
        </div>
    );
}
