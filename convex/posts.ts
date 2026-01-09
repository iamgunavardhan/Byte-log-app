import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";

/* =========================
   CREATE POST
========================= */

export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("Not authenticated");
        }

        const blogArticle = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user._id,
            imageStorageId: args.imageStorageId,
        });

        return blogArticle;
    },
});

/* =========================
   GET ALL POSTS
========================= */

export const getPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db
            .query("posts")
            .order("desc")
            .collect();

        return Promise.all(
            posts.map(async (post) => {
                const imageUrl =
                    post.imageStorageId !== undefined
                        ? await ctx.storage.getUrl(post.imageStorageId)
                        : null;

                return {
                    ...post,
                    imageUrl,
                };
            })
        );
    },
});

/* =========================
   GENERATE UPLOAD URL
========================= */

export const generateUploadUrl = mutation(async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
        throw new ConvexError("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
});

/* =========================
   GET POST BY ID
========================= */

export const getPostById = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);

        if (!post) {
            return null;
        }

        const imageUrl =
            post.imageStorageId !== undefined
                ? await ctx.storage.getUrl(post.imageStorageId)
                : null;

        return {
            ...post,
            imageUrl,
        };
    },
});

/* =========================
   SEARCH POSTS
========================= */

interface searchResultTypes {
    _id: string;
    title: string;
    body: string;
}

export const searchPosts = query({
    args: {
        term: v.string(),
        limit: v.number(),
    },
    handler: async (ctx, args) => {
        const results: Array<searchResultTypes> = [];
        const seen = new Set<string>();

        const pushDocs = (docs: Array<Doc<"posts">>) => {
            for (const doc of docs) {
                if (seen.has(doc._id)) continue;
                seen.add(doc._id);

                results.push({
                    _id: doc._id,
                    title: doc.title,
                    body: doc.body,
                });

                if (results.length >= args.limit) break;
            }
        };

        const titleMatches = await ctx.db
            .query("posts")
            .withSearchIndex("search_title", (q) =>
                q.search("title", args.term)
            )
            .take(args.limit);

        pushDocs(titleMatches);

        if (results.length < args.limit) {
            const bodyMatches = await ctx.db
                .query("posts")
                .withSearchIndex("search_body", (q) =>
                    q.search("body", args.term)
                )
                .take(args.limit);

            pushDocs(bodyMatches);
        }

        return results;
    },
});
