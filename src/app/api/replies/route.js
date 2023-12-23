import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
// CREATE A REPLY
export const POST = async (req) => {
    const session = await getAuthSession();
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  
    try {
      const { commentId, replyDesc } = await req.json();
  
      // Assuming you have a Prisma model named 'Reply'
      const reply = await prisma.reply.create({
        data: {
          replyDesc: replyDesc,
          userEmail: session.user.email,
          commentId,
        },
      });
  
      return new NextResponse(JSON.stringify(reply, { status: 200 }));
    } catch (err) {
      console.error('Error creating reply:', err);
  
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };
  


  // Delete a Reply

  export const DELETE = async (req) => {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(JSON.stringify({message: "not authenticated"}, {status: 401})
      );
    }

    try {
      const { replyId } = await req.json()
      const reply = await prisma.reply.findUnique({
        where: { id: replyId }
      })

      if (reply && reply.userEmail === session.user.email) {
        await prisma.reply.delete({where: {id: replyId}})
        return new NextResponse(JSON.stringify({message: "reply deleted successfully"}, {status: 200}));
      } else {
        return new NextResponse(JSON.stringify({message: "you don't have permission to delete this reply"}, {status: 403}));
        
      }
    } catch (error) {
      console.error("error deleting reply: ", error)
      return new NextResponse(JSON.stringify({message: "something went wrong"}, {status: 500}))
      
    }


  }  