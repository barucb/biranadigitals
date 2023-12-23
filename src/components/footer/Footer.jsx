"use client"
import { useState } from "react";
import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const [formData, setFormData] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { status } = useSession()

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFormData(inputValue);

    // Validate the email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputValue));
  };

  const handleEmailSubmit = async () => {
    if (!formData) {
      alert("Please enter your email before you hit the subscribe button ")
    }

    if (!isValidEmail) {
      alert("Please enter a valid email")
    }

    try {
      setSubmitting(true)
      const response = await fetch('/api/formSubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Newsletter subscription email submitted successfully:', responseData);
        // Handle success, such as displaying a success message or redirecting
        setFormData("")
      } else {
        console.error('Error submitting Newsletter subscription email:', response.statusText);
        // Handle error, such as displaying an error message to the user
      }
    } catch (error) {
      console.error('Error submitting Newsletter subscription email:', error);
      // Handle unexpected errors
    }
    setSubmitting(false)

  }

  return (
    <div className="">
      <div className="md:ml-16 lg:ml-48 lg:pt-32">
        {status !== "authenticated" ? (<div>
          <h1 className="text-2xl font-semibold md:text-4xl md:py-4">Stay in touch</h1>
          <p className="pt-2 pb-5">
            Subscribe to our newsletter and be the first to access <b> Special Offers</b> and receive Exclusive Updates on our latest services.


          </p>
          <div className="pb-5 flex ">
            <input type="email" className=" text-black py-2 px-1  lg:w-[450px] lg:p-4 md:w-[300px] rounded-l-lg" placeholder="Enter Your Email here..." value={formData} onChange={handleInputChange} />

            <button className="bg-[#fc7405]  rounded-r-lg p-1 sm:p-2 " disabled={submitting} onClick={handleEmailSubmit}>Subscribe</button>
          </div>
        </div>) : ""}



        <div className="flex pt-16">
          <Image src="/logo.png" alt="Birana Digitals Logo" width={50} height={50} />
          <h1 className="font-semibold text-xl">Birana Digitals</h1>
        </div>

        <div className="flex gap-5 py-5 pl-3">
          <Image src="/facebook.png" alt="" width={30} height={30} />
          <Image src="/instagram.png" alt="" width={30} height={30} />
          <Image src="/tiktok.png" alt="" width={30} height={30} />
          <Image src="/youtube.png" alt="" width={30} height={30} />
        </div>
      </div>
      <div>

        <hr className="text-black border-black pt-5" />
        <hr />
        <h1 className="py-3    text-center">© 2023 - Birana Digitals</h1>
      </div>
    </div>
  );
};

export default Footer;