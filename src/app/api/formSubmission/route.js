import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Create Contact Form Submission
export const POST = async (req) => {
    try {
      const formData = await req.json();
      console.log('FOrmSubmission creation request body:', formData); // Add this line for debugging
      const createdSubmission = await prisma.ContactForm.create({
        data: { formData },
      });
  
      console.log('Contact Form Submitted successfully:', formData); // Add this line for debugging
  
      return new NextResponse(JSON.stringify(createdSubmission, null, 2), { status: 200 });
    } catch (err) {
      console.error('Error Submitting Contact Form:', err); // Add this line for debugging
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };


  
// Get Contact Form Submissions
export const GET = async (req) => {
    try {
      const formSubmissions = await prisma.contactForm.findMany();
  
      return new NextResponse(JSON.stringify(formSubmissions, null, 2), { status: 200 });
    } catch (err) {
      console.error('Error fetching Contact Form Submissions:', err);
  
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, null, 2),
        { status: 500 }
      );
    }
  };