/* eslint-disable @typescript-eslint/no-unused-vars */
"use clent"
import RoomProvider from "@/components/RoomProvider"
import { auth } from "@clerk/nextjs/server"
import { use } from "react"


export default  function Layout({ children,params }: {
    children: React.ReactNode,params:Promise<{ id: string }>
}) {
    const {id}=use(params)
    auth.protect()
   console.log(id);
   
    return (
        <RoomProvider roomId={id}>
            {children}
        </RoomProvider>
    )
}
