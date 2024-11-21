import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'

import { toast } from 'sonner'
import useOwner from '@/lib/useOwner'
import { useUser } from '@clerk/nextjs'
import { useRoom } from '@liveblocks/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { removeUserFromDocument } from '../../actions/action'
import { useRouter } from 'next/navigation'

export default function MangeUsers() {
    const [isOpen,setIsOpen]=useState(false)
    const [isPending, startTransition] = useTransition()
    const router=useRouter()
    const isOwner=useOwner()
    const {user}=useUser()
    const room=useRoom()

    

    const [usersInRoom]=useCollection(
        user && query(collectionGroup(db,"rooms"),
    where("roomId","==",room.id)
)
    )
    
  
    const handleDelete=(UserId:string)=>{
        if(!user) return
            startTransition(async ()=>{
                   const {success}= await removeUserFromDocument(room.id,UserId)
                   if (success) {
                    setIsOpen(false)
                    toast.success("User Remove Successfully !")
                    router.replace("/")
                   } else {
                    toast.error("Failed to remove user !")
                   }
            })
    }
    return (
        <div>
            
          <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <Button asChild variant="destructive">
              <DialogTrigger>Users {usersInRoom?.docs.length}</DialogTrigger>
            </Button>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Users with access</DialogTitle>
                <DialogDescription>
                  Below is the list of user who have access to this document
                </DialogDescription>
              </DialogHeader>

              <hr className='my-2'/>
              <div className="flex flex-col gap-5">
                {/* User in the room */}
                    {usersInRoom?.docs.map((doc)=>(
                        <div className="flex items-center justify-between" key={doc.data().UserId}>
                          <p className="font-light">
                          {
                            doc.data().UserId === user?.emailAddresses[0].toString() ? `you (${doc.data().UserId})`:doc.data().UserId
                          } 
                          </p>
                          <div className="flex items-center gap-2 ">
                            <Button variant={"outline"}>{doc.data().role}</Button>
                            {
                                isOwner && doc.data().UserId !== user?.emailAddresses[0].toString() && (
                            <Button 
                            variant={"destructive"} 
                            onClick={()=>handleDelete(doc.data().UserId)} 
                            disabled={isPending} 
                            size={"sm"}>
                                {isPending ? "Removing...":"X"}
                            </Button>
                                )
                            }
                          </div>
                        </div>
                        
                    ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
}
