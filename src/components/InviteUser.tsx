"use client"
import React, { FormEvent, useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'

import { usePathname } from 'next/navigation'
import { inviteDocument } from '../../actions/action'
import { toast } from 'sonner'
import { Input } from './ui/input'

export default function InviteUser() {
    const [isOpen,setIsOpen]=useState(false)
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState("")
    const pathName=usePathname()

    
    
    const handleInvite=(e:FormEvent)=>{
      e.preventDefault()
        const roomId=pathName.split("/").pop() || ""
        if (!roomId) {
            console.error("Room ID is missing!");
            return; // Ensure roomId exists before proceeding
        }
            startTransition(async ()=>{
                   const {success}= await inviteDocument(roomId,email)
                   if (success) {
                    setIsOpen(false)
                    setEmail("")
                    toast.success("User added successfully in room !")
                   } else {
                    toast.error("Failed to add user in room !")
                   }
            })
    }
    return (
        <div>
            
          <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <Button asChild variant="outline">
              <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Invite a User to collaborate </DialogTitle>
                <DialogDescription>
                Enter the Email Id you want to Invite
                </DialogDescription>
              </DialogHeader>
             <form className='flex gap-2' onSubmit={handleInvite}>
             <Input 
             type='email'
             placeholder='Enter Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             />
             <Button
              type='submit'
              disabled={!email || isPending}
              variant="default"
             >
              {isPending ? "Inviting" : "Invite"}
             </Button>
             </form>
            </DialogContent>
          </Dialog>
        </div>
      );
}
