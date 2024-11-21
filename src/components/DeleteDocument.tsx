import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { usePathname } from 'next/navigation'
import { deleteDocument } from '../../actions/action'
import { toast } from 'sonner'


export default function DeleteDocument() {

    const [isOpen,setIsOpen]=useState(false)
    const [isPending, startTransition] = useTransition()
    const pathName=usePathname()
   
    
    
    const handleDelete=()=>{
        const roomId=pathName.split("/").pop() || ""
        if (!roomId) {
            console.error("Room ID is missing!");
            return; // Ensure roomId exists before proceeding
        }
            startTransition(async ()=>{
                   const {success}= await deleteDocument(roomId)
                   if (success) {
                    setIsOpen(false)
                    toast.success("Room Delete Successfully !")
                   } else {
                    toast.error("Failed to delete room !")
                   }
            })
    }
    return (
        <div>
            
          <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <Button asChild variant="destructive">
              <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogDescription>
                  This will delete the document and all of its content, removing all
                  users from the document.
                </DialogDescription>
              </DialogHeader>
    
              <DialogFooter className="sm:justify-end gap-2">
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  variant="destructive"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
}
