import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: {
        reply: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    console.log('Comment creation request body:', body); // Add this line for debugging
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    console.log('Comment created successfully:', comment); // Add this line for debugging

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    console.error('Error creating comment:', err); // Add this line for debugging
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// DELETE A COMMENT
export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const { commentId } = await req.json();
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    // Check if the user owns the comment
    if (comment && comment.userEmail === session.user.email) {
      await prisma.comment.delete({ where: { id: commentId } });
      return new NextResponse(
        JSON.stringify({ message: "Comment deleted successfully" }, { status: 200 })
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "You don't have permission to delete this comment" }, { status: 403 })
      );
    }
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


