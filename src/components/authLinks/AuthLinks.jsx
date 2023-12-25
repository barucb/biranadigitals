"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";

const AuthLinks = () => {

  const navLinks = [
    { name: "Home", href: '/' },
    { name: "About Us", href: '/about' },
    { name: "Contact Us", href: '/contact' },
    { name: "Blogs", href: '/blogpage' },
  ]


  const [openNavMenu, setOpenNavMenu] = useState(false);


  const { data: session, status } = useSession();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust the threshold as needed
      if (scrollPosition > 100) {
        setOpenNavMenu(false);
      }
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>


      <div className="z-10  ">
        <button onClick={(event) => { event.stopPropagation(); setOpenNavMenu(!openNavMenu); }}
          className="lg:hidden px-5  ">
          {openNavMenu ? <TfiClose className="absolute text-2xl  cursor-pointer right-10 top-4 lg:hidden" /> : <GiHamburgerMenu className="absolute text-3xl  cursor-pointer right-10 top-4 lg:hidden" />}
        </button>
        <div >

          <ul className={`lg:flex  text-2xl  sm:text-xl md:text-2xl sm:items-center xl:mr-10 2xl:mr-48 lg:static   lg:w-full  pr-10 bg-[#fc7405] mt-5  lg:mt-2  rounded-lg  lg:bg-transparent   absolute  left-0    transition-all duration-300 ease-in ${openNavMenu ? "left-12" : "left-[-300px]"} `}>

            {navLinks.map((link) => {
              return (

                <li key={link.name} onClick={() => setOpenNavMenu(false)} className=" pl-8  pb-3  " >
                  <Link className="text-white hover:text-red-600" href={link.href}  >{link.name}</Link>
                </li>
              )

            })}
            {status === "unauthenticated" ? (

              <li onClick={() => setOpenNavMenu(false)} className=" pl-8  pb-3 " >

                <Link className="text-white hover:text-red-600" href="/login" >
                  Login
                </Link></li>
            ) : (
              <>

                {session?.user?.role === "ADMIN" ?
                  <li onClick={() => setOpenNavMenu(false)} className=" pl-8  pb-3  hover:text-red-600 " >
                    <Link href="/write" >
                      Write
                    </Link>
                  </li>
                  : ""
                }
                <span onClick={signOut}
                >
                  <li onClick={() => setOpenNavMenu(false)} className=" pl-8 pb-3  cursor-pointer hover:text-red-600 " >

                    Logout
                  </li>
                </span>
              </>
            )}

          </ul>
        </div>
      </div>




      {/* <div ref={menuClick} className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "notauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
                 {session?.user?.role === "ADMIN" ? 
              <Link href="/write" className={styles.link}>
              Write
              </Link>
            : ""  
            }
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )} */}
    </>
  );
};

export default AuthLinks;
