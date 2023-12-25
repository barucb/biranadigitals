import React from 'react'

const Services = () => {
    return (
        <>







            <div>


                <div>

                    <p className="lg:mt-36 pt-32 pb-6 px-5 text-center text-[#fc7405] text-5xl font-bold">
                        Our Services

                    </p>

                    <div className="mx-1   grid grid-cols-1 md:mt-5 md:grid-cols-2 text-xl lg:text-2xl  lg:mx-28  xl:mx-60 lg:gap-20 gap-4">
                        <div className="flex">

                            <div className="py-2 mx-2 md:mt-3 ">
                                <Image className="w-48 py-5 mx-auto" src="/brand.png" alt="Branding" />

                                <b className="text-[#fc7405]">  Branding & Graphic Design<br /></b>
                                Craft a memorable brand identity with our expert Branding and Graphic Design services. From logos to visual elements, we bring your brand to life.

                            </div>
                        </div>
                        <div className="flex ">

                            <div className="py-2  mx-2 md:mt-3 ">
                                <Image className="w-48 py-5 mx-auto" src="/social-media.png" alt="social media marketing" />
                                <b className="text-[#fc7405]">Social Media Marketing</b><br />
                                Elevate your brand presence with our strategic Social Media Marketing services. Reach and engage your target audience on platforms that matter most.

                            </div>
                        </div>



                        <div className="flex">

                            <div className="py-2 mx-2 md:mt-3 ">
                                <Image className="w-48 py-5 mx-auto" src="/coding.png" alt="Web and app development" />

                                <b className="text-[#fc7405]">  Web & App Development<br /></b>
                                Transform your ideas into digital experiences. Our Web & App Development services create seamless, responsive, and user-friendly solutions tailored to your needs.

                            </div>
                        </div>
                        <div className="flex">

                            <div className="py-2 mx-2 md:mt-3">
                                <Image className="w-48 py-5 mx-auto" src="/seo.png" alt="SEO" />

                                <b className="text-[#fc7405]">  SEO (Search Engine Optimization)<br /></b>
                                Boost your online visibility and rankings with our SEO services. We optimize your digital presence, making it easier for your audience to find you.

                            </div>
                        </div>

                        <div className="flex">

                            <div className="py-2 mx-2 md:mt-3 ">
                                <Image className="w-48 py-5 mx-auto" src="/consulting.png" alt="Consultancy" />

                                <b className="text-[#fc7405]"> Consultancy<br /></b>
                                Gain valuable insights and expert guidance through our Consultancy services. Whether you&apos;re starting, growing, or refining, we provide strategic advice for your business success.

                            </div>
                        </div>

                        <div className="flex">

                            <div className="py-2 mx-2 md:mt-3 ">
                                <Image className="w-48 py-5 mx-auto" src="/influencer.png" alt="Influencer Marketing" />

                                <b className="text-[#fc7405]">Influencer Marketing<br /></b>
                                Amplify your brand message through trusted voices. Our Influencer Marketing services connect you with influencers who resonate with your audience.

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Services