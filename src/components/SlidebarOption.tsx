"use client"
import { doc } from 'firebase/firestore';

import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function SlidebarOption({href,id}:{
    href:string,
    id:string,
}) {

    const [data] = useDocumentData(doc(db,"documents",id));
    
    const pathame=usePathname();
    const isActive=href.includes(pathame) && pathame !== "/";


    if (!data) return <div className="">null</div>; 
  return (
    <Link href={href} className={`flex flex-col border rounded-md p-2 ${isActive ? "bg-gray-100 font-bold border-black":"border-gray-400"}`}>
     <p className="truncate"> {data?.title}</p>
    </Link>
  )
}

