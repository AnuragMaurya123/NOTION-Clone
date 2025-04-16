/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveBLocks";
import { adminDb } from "../../../firebase-admin";
export async function POST(request: NextRequest) {

  try {
    // Protect the route by ensuring the user is authenticated
  const { sessionClaims } = await auth();
  
  // Ensure sessionClaims exists before proceeding
  if (!sessionClaims) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the request body (the room data)
  const { room } = await request.json();

  // Prepare session with user info
  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      email:sessionClaims?.email,
      name: sessionClaims?.fullName,
      avatar: sessionClaims?.image,
    },
  });
  // Adjust the query depending on your Firestore structure
  const usersInRoom = await adminDb
    .collectionGroup("rooms") 
    .where("UserId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
  
  if (userInRoom?.exists) {
   
    session.allow(room, session.FULL_ACCESS); 
    const { body, status } = await session.authorize();
    return new NextResponse(body, { status });
  } else {
    // If the user is not in the room, return an error
    return new NextResponse("Forbidden: User does not have access to this room", { status: 403 });
}
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return new NextResponse(error.message || "Forbidden", { status: 403 });
    }
      
  }
}