"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/liveBLocks";

//function for adding document
export async function createNewDocument(): Promise<{ docId: string }> {
  const { sessionClaims } = await auth();

  if (!sessionClaims?.email) {
    throw new Error("User is not authenticated or email is missing");
  }

  try {
    console.log("docRef");
    const docRef = await adminDb.collection("documents").add({
      title: "New Doc",
    });
    if (!docRef || !docRef.id) {
      console.error("docRef is falsy:", docRef);
      throw new Error("Document creation failed");
    }

    await adminDb
      .collection("users")
      .doc(sessionClaims.email)
      .collection("rooms")
      .doc(docRef.id)
      .set({
        UserId: sessionClaims.email,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
      });

    return { docId: docRef.id };
  } catch (error) {
    console.error("Failed to create document", error);
    throw new Error("Document creation failed");
  }
}

//function for Inviting user in room
export async function inviteDocument(roomId: string, email: string) {
  //Ensuring user is authorized
  auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        UserId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

//function for deleting document
export async function deleteDocument(roomId: string) {
  //Ensuring user is authorized
  auth.protect();

  try {
    //deleting  the room from liveBLocks
    await liveblocks.deleteRoom(roomId);
    //deleting  document reference itself
    await adminDb.collection("document").doc(roomId).delete();
    //deleting the room reference from ever user"s collection for every user in the  room
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = adminDb.batch();
    query.docs.forEach((doc) => batch.delete(doc.ref));
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

//function for deleting document
export async function removeUserFromDocument(roomId: string, UserId: string) {
  //Ensuring user is authorized
  auth.protect();

  try {
    //deleting  document reference itself
    await adminDb
      .collection("users")
      .doc(UserId)
      .collection("rooms")
      .doc(roomId)
      .delete();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
