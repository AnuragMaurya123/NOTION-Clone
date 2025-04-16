"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { createNewDocument } from "actions/action";

export default function NewDocumentButton() {
  const router = useRouter();
  const { isSignedIn } = useAuth(); 
  const [isPending, startTransition] = useTransition();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      try {
        const { docId } = await createNewDocument()
        console.log("dhfcbsjdcbhs",docId);
        router.push(`/doc/${docId}`);
      } catch (error) {
        console.error("Error creating a new document:", error);
      }
    });
  };

  return (
    <Button onClick={handleCreateNewDocument} disabled={!isSignedIn || isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
}
