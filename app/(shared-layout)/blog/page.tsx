


import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {fetchQuery} from "convex/nextjs";
import {api} from "@/convex/_generated/api";

import {Skeleton} from "@/components/ui/skeleton";

import {cacheLife, cacheTag} from "next/cache";

export const dynamic = "force-dynamic";
export  default  function BlogPage(){

    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog
                </h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Insights, thoughts, and trends from our team.
                </p>
            </div>

       {/*<Suspense fallback={<SkeletonLoadingUi/>}>*/}
           <LoadBlogPosts />
       {/*</Suspense>*/}
        </div>

    )
}

async function LoadBlogPosts(){
    "use cache"
    cacheLife("hours")
    cacheTag("blog")
    const  data = await fetchQuery(api.posts.getPosts)
    return(
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
            {data?.map((post) =>(
                <Card key={post._id} className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden ">
                        <Image src={post.imageUrl ?? "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg"} alt="image" fill className="rounded-t-lg object-cover"/>
                    </div>

                    <CardContent>
                        <Link href={`/blog/${post._id}`}>
                            <h1 className="text-2xl font-bold hover:text-blue-600">{post.title}</h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                        <Link  className={buttonVariants({className:"w-full"})} href={`/blog/${post._id}`}>
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

function SkeletonLoadingUi(){
    return(
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 ">
            {[
                ...Array(4)].map((_, i) =>(
                    <div className="flex flex-col space-y-3" key={i}>
                        <Skeleton className="h-48 w-full rounded-xl"/>
                        <div className="space-y-2 flex flex-col">
                            <Skeleton className="h-6 w-3/4"/>
                            <Skeleton className="h-4 w-full "/>
                            <Skeleton className="h-4 w-2/3"/>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}