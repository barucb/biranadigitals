import Footer from "@/components/footer/Footer"
import Services from "@/components/services/services"
import Link from "next/link"
import React from "react"
import Image from "next/image"
const About = () => {
  return (
    <>
      <div className="pt-32 pb-16 lg:py-48 lg:pt-72 flex flex-col" >
        <div className=" lg:ml-32  flex flex-col lg:flex-row lg:text-start">
          <div className="lg:w-[50%] ">

            <p className="lg:text-5xl  text-3xl text-[#fc7405]">
              Who Are We?
            </p>
            <p className="md:text-3xl text-xl pt-5 ">
              <b>
                Passionate Experts
              </b>
              <p className="pt-3 pb-12">

                Our team is a collective of passionate individuals,
                each bringing a unique set of skills and expertise to the
                table. From digital marketing mavens to design virtuosos and coding wizards,
                we are united by a <b> common goal – your success.</b>
              </p>
            </p>
          </div>
          <div className="w-full lg:w-[40%] lg:pl-8">

            <Image src="/birana-experts.png" className="w-full  pt-5 lg:pt-10" />
          </div>

        </div>
        <div className=" lg:pt-36 lg:ml-32  flex flex-col lg:flex-row ">
          <div className="w-full order-2  lg:w-[40%] lg:pr-8">

            <Image src="/birana-innovators.png" className="w-full  pt-5 lg:pt-10" />
          </div>
          <div className="lg:w-[50%] order-1 lg:order-2 pt-16 lg:pl-24 xl:pl-48 lg:pt-16 ">

            <p className="md:text-3xl text-xl pt-5 ">
              <b>
                Innovators at Heart
              </b>
              <p className="pt-3 pb-12">

                Innovation is in our DNA. We stay at the forefront of digital trends,
                constantly exploring new possibilities to elevate your online presence.
                Whether its crafting compelling content, designing eye-catching visuals,
                or developing robust websites, we love what we do.
              </p>
            </p>
          </div>

        </div>


      </div >
      <Services />
      <div className="py-24 lg:pt-80">
        <p className="text-center font-bold pb-16 lg:text-5xl  text-3xl text-[#fc7405]">
          Why Choose Us?
        </p>
        <div className="md:text-3xl xl:px-72 text-xl px-3 lg:px-48 pt-5 ">

          <b>
            Tailored Solutions
          </b>
          <p className="pb-16 pt-2">

            We understand that every business is unique. Our solutions are not one-size-fits-all. We take the time to understand your goals and tailor our services to meet your specific needs.
          </p>
          <b>
            Results-Driven
          </b>
          <p className="pb-16 pt-2">
            Your success is our success. We are committed to delivering measurable results. Whether its increased website traffic, higher conversion rates, or enhanced brand visibility, we are with you every step of the way.
          </p>
          <b>
            Transparent Collaboration
          </b>
          <p className="pb-8 pt-2">
            We believe in transparent communication and collaboration. Throughout the project, you will have a dedicated team working closely with you, keeping you informed and involved.
          </p>
        </div>
      </div>
      <div className="pb-24 lg:pt-48">
        <p className="text-center font-bold pb-5 lg:text-5xl  text-3xl text-[#fc7405]">
          Let"s Create Together
        </p>
        <div className="md:text-3xl text-xl px-3 lg:px-64 pt-5 ">
          <b>
            Ready to embark on a digital journey with Birana Digitals?

          </b>

          <p className="pb-8  pt-2">
            Whether you are a startup looking to make your mark or an established business
            aiming for digital transformation, we are here to help.
            Let"s collaborate and turn your digital dreams into reality.
          </p>
          <Link href="/contact" className="font-bold pb-16 pt-5 text-center flex justify-center text-[#fc7405]">
            Click here to CONTACT US
          </Link>


        </div>
      </div>
      <Footer />
    </>
  )
}

export default About











