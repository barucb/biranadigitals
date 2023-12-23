import { FaStar } from "react-icons/fa"








const TestimonialCard = (props) => {
    return (
        <div className="text-[#fc7405] md:ml-16  max-w-sm  bg-white w-auto   shadow-lg mx-auto rounded-xl p-4">
            <p className="text-md md:text-lg font-bold ">

                “

                {props.quote}
                ”

            </p>
            <div className="flex items-center mt-4">
                <a href="#" className="relative block">
                    <img alt="profile" src={props.image} className=" object-cover rounded-full h-16 w-16 " />
                </a>
                <div className="flex flex-col justify-between ml-2">
                    <span className="text-xl font-semibold text-[#007F4E]">
                        {props.username}
                    </span>
                    <span className="flex items-center text-[#007F4E]   text-md ">
                        {props.position}
                    </span>
                    <span className="flex  text-yellow-500   ">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </span>
                </div>
            </div>
        </div >
    )
}





const Testimonials = () => {
  return (
    <div className="md:py-20  pb-24   mx-auto w-fit  mt-28 ">


    <p className=" pt-48 pb-16 text-2xl md:text-4xl text-center font-bold">


        Hear from Our Happy Clients . . .
    </p>
    <div className="flex  flex-wrap gap-5   justify-center  ">
        
        <TestimonialCard image="/joystore.jpg" username="HIKMA AB" quote="Birana Digitals brought the essence of joy to life with the vibrant and dynamic logo designed for Joy Store. The logo perfectly encapsulates the spirit of the brand, creating a visual identity that resonates with customers and leaves a lasting impression." position="Joy Store" />
        <TestimonialCard username="Betty Dawit" image="/queensabaartistry.jpg" quote="The regal touch and artistic flair of Queen Saba Artistry are beautifully captured in the logo crafted by Birana Digitals. The design reflects the elegance and creativity of Queen Saba Artistry, establishing a distinctive brand image that speaks to the heart of its audience." position="Queen Saba Artistry" />
    </div>

</div>


  )
}

export default Testimonials