"use client"
import {
    RoomProvider as RoomProviderWapper,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import LiveCurserProvider from "./LiveCurserProvider";

export default function RoomProvider({ roomId, children }: {
    roomId: string,
    children: React.ReactNode
}) {
    return (
        <RoomProviderWapper id={roomId} initialPresence={{ cursor: null }}>
            <ClientSideSuspense fallback={<LoadingSpinner />}>
                <LiveCurserProvider>
                    {children}
                </LiveCurserProvider>
            </ClientSideSuspense>
        </RoomProviderWapper>
    )
}
