"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {postSchema} from "@/app/schemas/blog";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

import {useTransition} from "react";
import {Loader2} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";






export default function CreateClient () {
    const [isPending, startTransition] = useTransition();
    const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
    const createPost = useMutation(api.posts.createPost);

    const form = useForm({
        resolver : zodResolver(postSchema),
        defaultValues: {title: "", content: "",image:undefined},
    });

    function onSubmit(values: z.infer<typeof postSchema>) {
        startTransition(async () => {
            let imageStorageId = undefined;

            // 1️⃣ If user selected an image, upload it to Convex Storage
            if (values.image) {
                // Ask Convex for a temporary upload URL
                const uploadUrl = await generateUploadUrl();

                // Upload file directly from browser to Convex Storage
                const response = await fetch(uploadUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": values.image.type,
                    },
                    body: values.image,
                });

                // Convex returns a storageId
                const { storageId } = await response.json();
                imageStorageId = storageId;
            }

            // 2️⃣ Create post using ONLY serializable data
            await createPost({
                title: values.title,
                body: values.content,
                imageStorageId,
            });
        });
    }

    return (
        <div className="px-4 py-12 pt-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Post</h1>
                <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the big world.</p>
            </div>

            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new blog article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller name="title" control={form.control} render={({field, fieldState}) =>(
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Super cool title" {...field}/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                            />
                            <Controller name="content" control={form.control} render={({field, fieldState}) =>(
                                <Field>
                                    <FieldLabel>Content</FieldLabel>
                                    <Textarea aria-invalid={fieldState.invalid} placeholder="write you content" {...field}/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                            />
                            <Controller name="image" control={form.control} render={({field, fieldState}) =>(
                                <Field>
                                    <FieldLabel>Image</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Upload your image" type="file" accept="image/*" onChange={(event) => {
                                        const file = event.target.files?.[0]
                                        field.onChange(file)
                                    }}/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                            />
                            <Button  disabled={isPending}>{isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin"/>
                                    <span>Loading...</span>
                                </>
                            ):(
                                <span>Create Post</span>
                            )}</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
