"use client"
import { FormEvent, useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Editor from "./Editor"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "./DeleteDocument"
import InviteUser from "./InviteUser"
import MangeUsers from "./MangeUsers"
import AvatarUsers from "./AvatarUsers"

export default function Document({ id }: { id: string }) {

    const [input, setInput] = useState("")
    const [isUpdating, startUpdating] = useTransition()
    const [data, loading, error] = useDocumentData(doc(db,"documents",id));
    const isOwner=useOwner()

    useEffect(() => {
        if(data){
            setInput(data.title)
        }
    }, [data])
    
   
        const handleUpdateTitle=(e:FormEvent)=>{
            e.preventDefault()
            startUpdating(async ()=>{
                await updateDoc(doc(db,"document",id),{
                    title:input
                })
            })
        }
   
        if (!data) return null; 
        if (error) return <div className="">{error.message}</div>
        if (loading) return
    return (
        <div className="flex-1 bg-white p-5">
            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex flex-1 space-x-2">
                    {/* updated title */}
                    <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
                    <Button onClick={handleUpdateTitle} disabled={isUpdating}>{isUpdating? "Updating...":"Update"}</Button>
                    {/* if */}
                   
                    {isOwner && (<>
                     {/* isOwer &&  ,DeleteUser */}
                     <InviteUser/>
                     <DeleteDocument/>

                    </>)}
                </form>
            </div>
            <div className="flex max-w-6xl mx-auto justify-between mb-5">
                {/* managerUser */}
                <MangeUsers/>

                {/* Avatars */}
                <AvatarUsers />
            </div>
           <hr className="pb-10" />
           {/* collaborative Editor */}
           <Editor/>
            
        </div>
    )
}
