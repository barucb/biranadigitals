import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import Footer from "@/components/footer/Footer";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className="pt-32 w-full max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:space-x-8 w-full">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{data?.title}</h1>
          <div className="flex items-center mb-4">
            {data?.user?.image && (
              <div className="mr-4">
                <Image src={data.user.image} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
              </div>
            )}
            <div >
              <span className="text-sm md:text-base">{data?.user?.name}</span>
              <div>

                <span className="">{data?.createdAt?.substring(0, 10)}</span>
                <span className="pl-2">{data?.createdAt?.substring(11, 16)}</span>
              </div>

            </div>
          </div>
        </div>
        {data?.img && (
          <div className="flex-1">
            <Image src={data.img} alt="" className="w-full h-auto" />
          </div>
        )}
      </div>
      <div className="mt-8">
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: data?.desc || "" }}
        />
        <div className="mt-8">
          <Comments postSlug={slug} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SinglePage;
