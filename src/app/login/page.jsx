"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const { status } = useSession();
  const returnUrl = sessionStorage.getItem("returnUrl");
  console.log("return url is", returnUrl)
  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push(returnUrl || "/")
  }
  console.log(status)
  return (
    <div className="flex justify-center`">
      <div className=" mt-10 flex flex-col justify-center items-center mx-auto">
        <p className="mt-48 text-2xl py-7  font-semibold">Log In to Birana Digitals</p>
        <div className="bg-[#fc7405] text-xl flex gap-4  cursor-pointer text-black p-5 rounded-xl my-5" onClick={() => signIn("google")}>
          <FaGoogle size={28} /> Sign in with Google
        </div>
        <div className="bg-[#fc7405] text-xl  gap-4 flex text-black p-5 cursor-pointer rounded-xl my-5" onClick={() => signIn("github")}>
          <FaGithub size={28} /> Sign in with Github</div>
        {/* <div className={styles.socialButton} onClick={() => signIn("facebook")}>Sign in with Facebook</div> */}
      </div>
    </div>
  );
};

export default LoginPage;
