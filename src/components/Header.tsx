"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import BreadCrumbs from "./BreadCrumbs";
import { createNewDocument } from "actions/action";
import { useEffect } from "react";

export default function Header() {
  const {user}=useUser();
  
  // useEffect(() => {
  //   if (!user) return;
  //   (async ()=>{
  //     await createNewDocument()
  //   })()  
  // }, [user])
  return (
    <div className="flex justify-between  items-center  p-5 ">
      {
        user && (
          <div className="text-2xl">{user?.firstName}{`"s`} Space</div>
        )
      }

      {/* breadcrumbs */}
      <BreadCrumbs/>

      <div className="">
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
        <UserButton/>
        </SignedIn>
      </div>
    </div>
  )
}

