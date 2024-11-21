/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import SlidebarOption from './SlidebarOption'

interface RoomDocument extends DocumentData{
  createdAt:string,
  role: "owner" | "editor"
  roomId:string
  UserId:string
}



export default function Sidebar() {

  const {user} = useUser()

  

  const [groupedData, setGroupedData] = useState<{
    owner:RoomDocument[]
      editor:RoomDocument[]
  }>({
    owner:[],
    editor:[],
  })
  const [data, loading, error] = useCollection(
    user && (
      query(
        collectionGroup(db, "rooms"),
        where("UserId", "==", user.emailAddresses[0].emailAddress))
    )
  );

    
  useEffect(() => {
if (!data) return;
  
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument; // Extract the data from the document snapshot
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id, // Add the document ID
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id, // Add the document ID
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
  
    setGroupedData(grouped);
  }, [data]);

  const menuOption=(
    <>
   <div className="flex justify-center items-center">
<NewDocumentButton/>
   </div>
    {/*My Document */}
      {user && (
        <div className="flex py-4  flex-col space-y-4  md:max-w-36  ">
        {
              groupedData.owner.length === 0 ?(
                <h2 className="text-gray-500 font-bold text-md">
                  No Document Found
                </h2>
              ):(
                <div className=" text-center space-y-5">
                  <h2 className="text-gray-500 font-bold text-sm">
                  My Documents 
                </h2>
                 {
                    groupedData.owner.map((doc)=>(
                   
                      <SlidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}  />
                    ))
                  }
                  
                
                </div>
              )
            }
        
           
            {/* Shared With me */}
        
            {groupedData.editor.length >0 &&(
               <div className=" text-center space-y-5">
               <h2 className="text-gray-500 font-semibold text-sm">
              Shared With Me
             </h2>
              {
                 groupedData.editor.map((doc)=>(
                
                   <SlidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}  />
                 ))
               }
               
             
             </div>
            )}
         </div>
      )}
    {/* List */}
    </>
  )

  if (error) return <div className="p-4 mb:p-5 bg-gray-200 relative ">{error.message}</div>
  if (loading) return 
  return (
    <div className='p-4 mb:p-5 bg-gray-200 relative '>
       <div className="md:hidden flex  items-center justify-center">
       <Sheet>
          <SheetTrigger>
            <MenuIcon className='p-2 hover:opacity-20 rounded-lg' size={40}/>
          </SheetTrigger>
          <SheetContent side={'left'} >
            <SheetHeader className='flex' >
              <SheetTitle>Menu</SheetTitle>
              <div className='w-full '>
              {menuOption}
              </div>
             
            </SheetHeader>
          </SheetContent>
        </Sheet>
       </div>
      <div className="hidden md:inline">
     {menuOption}
      </div>
    </div>
  )
}
