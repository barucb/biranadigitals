import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    const catWithPost = await Promise.all(
      categories.map(async (category) => {
        const posts = await prisma.post.findMany({
          where: {
            catSlug: category.slug,
          },
        });

        return { ...category, posts };
      })
    );
    return new NextResponse(JSON.stringify(catWithPost, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify("Error in fetching categories", { status: 500 })
    );
  }
};
