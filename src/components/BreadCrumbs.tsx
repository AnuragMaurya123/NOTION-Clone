"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "./ui/breadcrumb"
import { Fragment } from "react"
  

export default function BreadCrumbs() {

    const pathName=usePathname()

    const segments=pathName.split("/")
    
    

  return (
    <div>
      <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
  {
    segments.map((segment,index)=>{
        if(!segment) return null;
        const href=`${segments.slice(0,index+1).join("/")}`
        const isLast=index===segments.length-1
            
        return(
           <Fragment key={index}>
           <BreadcrumbSeparator/>
            <BreadcrumbItem>
            {isLast ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
            ):(
            <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                    )}
              
              </BreadcrumbItem>
           </Fragment>
        )
    })
  }
  </BreadcrumbList>
</Breadcrumb>

    </div>
  )
}
