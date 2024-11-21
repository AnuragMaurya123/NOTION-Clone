/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Document from "@/components/Document"

import { use } from "react"

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const {id}=use(params)

    
 if (id) {
  return (
    <div className='flex flex-1 flex-col min-h-screen'>
      <Document id={id}/>
    </div>
  )
 } else {
  <div className='flex flex-1 flex-col min-h-screen'>
  <h1>Please login First</h1>
 
</div>
 }
}
