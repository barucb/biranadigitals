"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from 'next/dynamic';  // Import dynamic
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });  // Use dynamic import


const WritePage = () => {
  const { data: session, status } = useSession();
  console.log("session is: ", session)

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [shortdesc, setShortdesc] = useState("");

  const [catSlug, setCatSlug] = useState("");
  const [category, setCategory] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://biranadigitals.vercel.app/api/categories");

        if (!res.ok) {
          throw new Error("failed");
        }
        const data = await res.json();
        setCategory(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className="mt-48">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }




  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        shortdesc: shortdesc,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "Coding", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };


  if (session?.user?.role !== "ADMIN") {
    return (
      <>

        <div className=" pt-32 flex  w-full  flex-col z-10"        >
          <input
            type="text"
            placeholder="Title"
            className="w-1/3 text-black p-3 mt-4"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Short Description"
            className="w-1/3 text-black p-3 mt-4"
            onChange={(e) => setShortdesc(e.target.value)}
          />
          <select className="text-black w-fit p-2 my-5" onChange={(e) => setCatSlug(e.target.value)}>
            {category?.map((cat) => (

              <option key={cat.slug} value={cat.slug}>{cat.title}</option>
            ))}

          </select>
          <div className="flex flex-col  gap-5  "
          >
            <button className="p-2 flex  rounded-full" >


              <label htmlFor="image" className="sm:p-2  sm:text-2xl">
                Select an Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                placeholder=""
                className="w-fit p-2"
              />
            </button>
            <ReactQuill
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Tell your story..."
            />
          </div>
          <button className="top-20 md:top-32 right-5 fixed p-3 md:p-5  bg-[#1a8917] text-white cursor-pointer rounded-lg"
            onClick={handleSubmit}>
            Publish
          </button>
        </div>


      </>
    );
  }
  if (session?.user?.role === "USER") {
    return (
      <div className="pt-48">
        <h1>You are not an Admin. You can&apos;t write posts</h1>
      </div>
    )
  }
};

export default WritePage;
