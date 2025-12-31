"use client";

import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface PostPresenceProps {
    roomId: Id<"posts">;
}

export function PostPresense({ roomId }: PostPresenceProps) {
    // 🔥 Client-side auth source of truth
    const userId = useQuery(api.presence.getUserId);

    // Not logged in or still loading
    if (!userId) return null;

    const presenceState = usePresence(api.presence, roomId, userId);

    if (!presenceState || presenceState.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Viewing now
            </p>
            <FacePile presenceState={presenceState} />
        </div>
    );
}
