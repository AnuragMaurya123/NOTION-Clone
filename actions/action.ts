"use server"

import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin"
import liveblocks from "@/lib/liveBLocks"



//function for adding document
 export async function createNewDocument() {
    //Ensuring user is authorized
    auth.protect()
    const {sessionClaims}=await auth()
    if (!sessionClaims || !sessionClaims.email) {
        throw new Error("User is not authenticated or email is missing");
    }

    //adding new document
    const dbCollectionRef=adminDb.collection("document")
    const docRef=await dbCollectionRef.add({
        title: "New Doc"
    })

    //adding new document to user room
    adminDb.collection("users").doc(sessionClaims?.email).collection("rooms").doc(docRef.id).set({
        UserId:sessionClaims?.email,
        role:"owner",
        createdAt:new Date(),
        roomId:docRef.id
    })
    return {docId:docRef.id}
}

//function for Inviting user in room
export async function inviteDocument(roomId:string,email:string) {
    //Ensuring user is authorized
    auth.protect()
   
   try {
   await adminDb.collection("users").doc(email).collection("rooms").doc(roomId)
   .set({
    UserId:email,
    role:"editor",
    createdAt:new Date(),
    roomId
   })
    return {success:true}
   } catch (error) {
    console.log(error);
    return {success:false}
    
   }

   
}

//function for deleting document
export async function deleteDocument(roomId:string) {
    //Ensuring user is authorized
    auth.protect()
   
   try {

     //deleting  the room from liveBLocks
     await liveblocks.deleteRoom(roomId)
    //deleting  document reference itself
    await adminDb.collection("document").doc(roomId).delete()
    //deleting the room reference from ever user"s collection for every user in the  room 
    const query=await adminDb
    .collectionGroup("rooms")
    .where("roomId","==",roomId)
    .get()
    const batch=adminDb.batch()
    query.docs.forEach((doc)=>(
        batch.delete(doc.ref)
    ))
    return {success:true}
   } catch (error) {
    console.log(error);
    return {success:false}
    
   }

   
}

//function for deleting document
export async function removeUserFromDocument(roomId:string,UserId:string) {
    //Ensuring user is authorized
    auth.protect()
   
   try {

    //deleting  document reference itself
    await adminDb.collection("users").doc(UserId).collection("rooms").doc(roomId).delete()
    return {success:true}
   } catch (error) {
    console.log(error);
    return {success:false}
    
   }

   
}