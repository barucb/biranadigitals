"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { storeReturnUrl } from "@/utils/storeReturnUrl";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;

};

const handleSetUrl = () => {
  storeReturnUrl(window.location.href)
  console.log(sessionStorage)

  window.location.href = "/login"
}

const Comments = ({ postSlug }) => {
  const { data: session, status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher,

  );

  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false)

  const handleCommentSubmit = async () => {

    try {

      setSubmitting(true)


      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      mutate();
      setDesc("")
      setSubmitting(false)
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const handleDeleteComment = async (commentId) => {

    try {
      setSubmitting(true)
      await fetch("/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
      });
      mutate(); // Refetch comments after deletion
      setSubmitting(false)

    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  console.log("comments: ", data)
  const [replyClicked, setReplyClicked] = useState([{}])

  const handleDeleteReply = async (replyId) => {
    try {
      setSubmitting(true)
      await fetch("/api/replies", {
        method: "DELETE",
        body: JSON.stringify({ replyId })
      });
      mutate();
      setSubmitting(false)

    } catch (error) {
      console.error("Error deleting reply", error)
    }
  }


  const handleReplyClick = (commentId) => {
    setReplyClicked((states) => ({
      [commentId]: !states[commentId]
    }))


  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (desc.trim()) {
        handleCommentSubmit()
      }
    }

    if (e.key === "Enter" && e.shiftKey) {
      setDesc((prev) => prev + "\n")
    }
  }


  console.log("session: ", session)

  const [replyDesc, setReplyDesc] = useState("");
  const [submittingReply, setSubmittingReply] = useState({});

  const handleReplySubmit = async (commentId) => {
    try {
      setSubmitting(true)
      setSubmittingReply((prevState) => ({
        ...prevState,
        [commentId]: true,
      }));

      const response = await fetch("/api/replies", {
        method: "POST",
        body: JSON.stringify({ commentId, replyDesc }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Assuming you have a mutate function for refreshing comments
      // Update this based on your actual implementation
      mutate();
    } catch (error) {
      console.error('Error submitting reply:', error.message);
    } finally {
      setReplyDesc("");
      setSubmitting(false)
      setSubmittingReply((prevState) => ({
        ...prevState,
        [commentId]: false,
      }));

      setReplyClicked((states) => ({
        [commentId]: !states[commentId]
      }))

    }
  };


  return (

    <div className="pb-32">
      <h1 className="">Comments </h1>
      {status === "authenticated" ? (
        <div className="flex  gap-2">
          <input
            value={desc}
            type="text"
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="write a comment..."
            className="p-2 rounded-md my-2 w-full sm:w-1/2 text-black"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            title={!desc.trim() ? "Please insert a valid comment" : "Send"}
            disabled={submitting || !desc || !desc.trim()}
            className={`bg-[#fc7405] text-black border px-2 my-2 rounded-lg  ${!desc.trim() || submitting ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={handleCommentSubmit}>
            Send
          </button>
        </div>
      ) : (
        <button className="text-[#fc7405] rounded p-2 my-3 border border-[#fc7405]" onClick={handleSetUrl}>

          Login to write a comment
        </button>
      )}
      {console.log("comments: ", data)
      }
      <div className="">
        {isLoading
          ? "loading"
          : data?.map((comment) => (
            <div className="" key={comment.id}>
              <div className="pt-5 flex gap-2">
                {comment?.user?.image && (
                  <img
                    src={comment.user.image}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}
                <div className="">
                  <span className="">{comment.user.name}</span>
                  <div>
                    <span className="">{comment.createdAt.substring(0, 10)}</span>
                    <span className="pl-2">{comment.createdAt.substring(11, 16)}</span>
                  </div>
                </div>
              </div>
              <p className="italic pt-2 pl-12">"{comment.desc}"</p>
              {status === "authenticated" ? (

                <button onClick={() => handleReplyClick(comment.id)} key={comment.id} className="text-[#fc7405] pl-12 font-semibold">Reply</button>
              ) : ""
              }

              {session && session?.user.email === comment?.userEmail && (



                <button disabled={submitting} className="text-[#fc7405] pl-5 font-semibold" onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>

              )}
              {replyClicked[comment.id] && (
                <div className="pl-12">
                  <input value={replyDesc} autoFocus
                    onChange={(e) => setReplyDesc(e.target.value)} type="text" placeholder="Your reply. . ." className="p-2 rounded-md mt-2 w-full sm:w-1/2  text-black" />
                  <div className="flex gap-3 py-2 ">
                    <button onClick={() => handleReplyClick(comment.id)} className="bg-red-600 text-white border px-2 rounded-lg mt-3">Cancel</button>
                    <button disabled={submitting || !replyDesc || !replyDesc.trim()} onClick={() => handleReplySubmit(comment.id)} className={`bg-[#fc7405] text-black border px-3 mt-3   rounded-lg ${submitting || !replyDesc.trim() ? "cursor-not-allowed" : "cursor-pointer"} `}> {submittingReply[comment.id] ? "Sending..." : "Send"}</button>
                  </div>
                </div>
              )}
              <div>

                {comment?.reply?.map((reply) => (
                  <div className="pl-12" key={reply?.id}>
                    <div className="pt-5 flex gap-2">
                      {reply?.user?.image && (
                        <img
                          src={reply?.user.image}
                          alt=""
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      )}
                      <div className="">
                        <span className="">{reply?.user.name}</span>
                        <div>
                          <span className="">{reply?.createdAt.substring(0, 10)}</span>
                          <span className="pl-2">{reply?.createdAt.substring(11, 16)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="italic pt-2 pl-12">"{reply?.replyDesc}"</p>
                    <div>
                      {session && session?.user.email === reply?.userEmail && (
                        <button disabled={submitting} className="pl-12 text-[#fc7405] pt-2 font-semibold" onClick={() => handleDeleteReply(reply?.id)}>
                          Delete
                        </button>

                      )}

                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
