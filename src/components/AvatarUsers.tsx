"use client"

import { useOthers, useSelf } from "@liveblocks/react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"



export default function AvatarUsers() {
    const others = useOthers()
    const self = useSelf()
    const all = [self, ...others]
    
    return (
        <div className="flex gap-2 items-center">
            <p className="font-light text-sm">currently editing this page</p>
            <div className="flex -space-x-5">
                {
                    all?.map((other,i) => (
                        <TooltipProvider key={`${other?.id}` + `${i}`}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar>
                                    <AvatarImage src={other?.info.avatar} />
                                    <AvatarFallback>{other?.info.name}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p className="">{self?.id===other?.id? "You":other?.info.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))
                }
            </div>

        </div>
    )
}
