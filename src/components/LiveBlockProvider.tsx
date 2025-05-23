
"use client"

import {
    LiveblocksProvider,
  } from "@liveblocks/react/suspense";

export default function LiveBlockProvider({children}:{
    children:React.ReactNode
}) {

    if (!process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY is not set")
    }
  return <LiveblocksProvider throttle={16} authEndpoint="/auth-endPoint">
    {children}
  </LiveblocksProvider>
}
