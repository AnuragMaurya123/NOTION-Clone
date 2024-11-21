"use client"
import { useState, useTransition } from "react";
import * as Y from "yjs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from 'sonner'
import { Languages } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BotIcon } from "lucide-react";
import Markdown from "react-markdown";

type Languages =
    | "mandarin"
    | "chinese"
    | "spanish"
    | "arabic"
    | "french"
    | "persian"
    | "german"
    | "russian"
    | "malay"
    | "portuguese"
    | "italian"
    | "turkish"
    | "lahnda"
    | "tamil"
    | "urdu"
    | "korean"
    | "hindi"
    | "bengali"
    | "japanese"
    | "vietnamese"
    | "telugu"
    | "marathi";

const languages: Languages[] = ["mandarin"
    , "chinese"
    , "spanish"
    , "arabic"
    , "french"
    , "persian"
    , "german"
    , "russian"
    , "malay"
    , "portuguese"
    , "italian"
    , "turkish"
    , "lahnda"
    , "tamil"
    , "urdu"
    , "korean"
    , "hindi"
    , "bengali"
    , "japanese"
    , "vietnamese"
    , "telugu"
    , "marathi"
]

export default function TranslateDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false)
    const [language, setLanguage] = useState("")
    const [summary, setSummary] = useState<string>("")
    const [isPending, startTransition] = useTransition()

    const handleAskQuestion = (e: React.FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const documentData=doc.get("document-store").toJSON()
            const res=await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        documentData,
                        targetLang:language
                    })
                }
            )

            if (res.ok) {
               const {translated_text}=await res.json()
               setSummary(translated_text)
               toast.error("Translated Summary Successfully !")
                    console.log(translated_text);
                    
               } else {
                toast.error("Failed to Translate Summary !")
               }
        })
    }
    return (
        <div>

            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <Button asChild variant="outline">
                    <DialogTrigger><Languages />Translate</DialogTrigger>
                </Button>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Translate the Document </DialogTitle>
                        <DialogDescription>
                           Select a Language and AI will translate a summary of the document in the selected language
                        </DialogDescription>
                       
                    </DialogHeader>
                    {summary &&(
                        <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                            <div className="flex">
                                <BotIcon className="w-10 flex-shrink-0" />
                                
                                <p className="font-bold whitespace-nowrap">
                                    GPT {isPending ? "is thinking....":"Says"}    
                                </p>
                                
                            </div>
                            <div>{isPending ? "Thinking...":<Markdown>{summary}</Markdown>}</div>
                        </div>
                    )}
                    <form className='flex gap-2' onSubmit={handleAskQuestion}>
                        <Select   value={language}  onValueChange={(value)=>setLanguage(value)}>
                            <SelectTrigger >
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                               {languages.map((value)=>(
                                <SelectItem key={value} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</SelectItem>
                               ))}
                            </SelectContent>
                        </Select>

                        <Button
                            type='submit'
                            disabled={!language || isPending}
                            variant="default"
                        >
                            {isPending ? "Translating" : "Translate"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
