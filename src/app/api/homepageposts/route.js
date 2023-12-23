import { NextResponse } from "next/server";

import prisma from "@/utils/connect";

export const GET = async (req) => {
  const query = {
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  };

  try {
    const posts = await prisma.post.findMany(query);
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);

    return new NextResponse(JSON.stringify({ error: "Internal erver error" }), {
      status: 500,
    });
  }
};
