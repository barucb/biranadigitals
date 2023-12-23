
// import CardList from "@/components/cardList/CardList";
import Link from "next/link";
import styles from "./blogPage.module.css";
import { BlogCard } from "@/components/blogs/blogs";
import { reload } from "@/components/pagination/Pagination";
import Footer from "@/components/footer/Footer";
// import Menu from "@/components/Menu/Menu";

const BlogPage = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  const data = await fetch('http://localhost:3000/api/catwithposts')
  const catWithPost = await data.json()
  console.log("category : ", catWithPost)

  // if (!catWithPost) {
  //  return <div className="mt-32">Loading . . .</div>

  // }



  return (
    <div id="top" className="flex flex-col px-2 py-4  pt-32">
      <h4 className="sm:pl-5 mb-3 mt-5 text-center text-3xl font-bold sm:text-4xl">Birana Blogs</h4>
      <div className="flex flex-col gap-2 pb-60 ">
        {catWithPost?.map((cat) => (
          <div className="flex flex-col" key={cat.id}>
            <div className="pt-12" id={cat?.title}>
            </div>
            <h1 className="text-3xl font-semibold pt-5 py-5">
              {cat.title} Blogs
            </h1>
            <div className="grid  sm:grid-cols-2 gap-5 grid-cols-1  md:grid-cols-3 lg:grid-cols-4">

              {cat?.posts?.map((post) => (
                <Link key={post.id} href={`/posts/${post?.slug}`}>
                  <BlogCard props={post} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
      {/* <div className="flex py-10 justify-center"> */}

      {/* <button onClick={reload} className=" bg-[#fc7405]  p-2 rounded-md">Back to top</button> */}
      {/* </div> */}
    </div>






    // {/* <BlogCard /> */}
    // {/* <Menu /> */}
  );
};

export default BlogPage;
