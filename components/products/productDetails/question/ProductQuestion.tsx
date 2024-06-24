"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { addQuestionServerAction } from "./addServerAction";
import { validatedTag } from "@/helpers/validated-tag";
import { useRouter } from "next/navigation";
import { deleteServerAction } from "./deleteServerAction";
import { FaTrashArrowUp } from "react-icons/fa6";
import { PiNotePencilFill } from "react-icons/pi";
import { updateServerAction } from "./updateServerAction";
import { MdOutlineReply } from "react-icons/md";
import { addReplyAction } from "./reply/addReplyAction";
import { deleteReplyAction } from "./reply/releteReplyAction";
import { updateReplyAction } from "./reply/updateReplyAction";

type TQusetion = {
  content: string;
  _id: string;
  createdAt: string;
  user: { name: string; id: string; _id: string };
  replies: {
    content: string;
    _id: string;
    createdAt: string;
    user: { name: string; id: string; _id: string };
  }[];
};

const ProductQuestion = ({ questions, productId }) => {
  // console.log("🚀 ~ ProductQuestion ~ questions:", questions);
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyEditMode, setReplyEditMode] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyId, setReplyId] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (status === "unauthenticated") return toast("Login first");
    try {
      if (editMode) {
        setLoading(true);

        const response = await updateServerAction({
          userId: data?.user?.id,
          qid: questionId,
          content: content,
        });

        setLoading(false);
        if (response?.result) {
          validatedTag("question");
          toast(response?.message);
          router.refresh();
          setEditMode(false);
          setQuestionId("");
          setContent("");
        }

        if (response?.error) {
          toast(response?.error);
        }
      } else {
        setLoading(true);
        const response = await addQuestionServerAction({
          user: {
            id: data?.user?.id,
            name: data?.user?.name,
          },
          content: content,
          productID: productId,
        });

        setLoading(false);

        if (response?.result) {
          validatedTag("question");
          toast(response?.message);
          router.refresh();
          setContent("");
        }

        if (response?.error) {
          toast(response?.error);
        }
      }

      // console.log(response);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleReplySubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (replyEditMode) {
        setReplyLoading(true);
        const response = await updateReplyAction({
          userId: data?.user?.id,
          content: replyContent,
          id: replyId,
        });

        setReplyLoading(false);
        if (response?.result) {
          validatedTag("question");
          toast(response?.message);
          router.refresh();
          setReplyContent("");
          setReplyId("");
          setReplyEditMode(false);
        }

        if (response?.error) {
          toast(response?.error);
        }
      } else {
        setReplyLoading(true);
        const response = await addReplyAction({
          user: {
            id: data?.user?.id,
            name: data?.user?.name,
          },
          content: replyContent,
          questionID: questionId,
        });

        setReplyLoading(false);
        if (response?.result) {
          validatedTag("question");
          toast(response?.message);
          router.refresh();
          setReplyContent("");
          setReplyId("");
          setReplyEditMode(false);
        }

        if (response?.error) {
          toast(response?.error);
        }
      }
    } catch (error) {
      setReplyLoading(false);
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (status === "unauthenticated") return toast("Login first");

    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      setLoading(true);
      const response = await deleteServerAction({
        id: id,
        userId: data?.user?.id,
      });

      setLoading(false);

      if (response?.result) {
        validatedTag("question");
        toast(`${response?.message} ${response?.result?.content}`);
        router.refresh();
      }

      if (response?.error) {
        toast(response?.error);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  function handleSetQuestion(id: string) {
    setEditMode(true);
    setQuestionId(id);
  }

  function handleReplyBoxOpen(ind, id) {
    setReplyOpen(true);
    setTabIndex(ind);
    setQuestionId(id);
    console.log(id);
  }

  function handleReplyBoxClose(ind) {
    setReplyOpen(false);
    setTabIndex(null);
  }

  function handleSetReply(id, qid) {
    setReplyEditMode(true);
    setReplyId(id);
    setQuestionId(qid);
  }

  async function handleDeleteReply(id) {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const response = await deleteReplyAction({
        id: id,
        userId: data?.user?.id,
      });

      if (response?.result) {
        validatedTag("question");
        toast(`${response?.message} ${response?.result?.content}`);
        router.refresh();
      }

      if (response?.error) {
        toast(response.error);
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  }

  useEffect(() => {
    if (replyEditMode && questionId) {
      const findQuestionReply = questions?.result?.find(
        (question) => question?._id == questionId
      );

      const findRep = findQuestionReply?.replies?.find(
        (reply) => reply?._id == replyId
      );

      setReplyContent(findRep?.content);
    }
  }, [questionId, questions?.result, replyEditMode, replyId]);

  useEffect(() => {
    if (editMode) {
      const findQuestion = questions?.result?.find(
        (question) => question?._id === questionId
      );
      setContent(findQuestion?.content);
    }
  }, [editMode, questionId, questions?.result]);

  if (status === "loading") {
    return (
      <div className="min-h-[30vh] flex flex-col justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-2 lg:p-5">
      {/* question form  */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Write your Question here.</label>
        <textarea
          cols={2}
          className="input"
          name={"content"}
          id={"content"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button disabled={loading} type="submit" className="btn text-xs">
          {loading ? (
            <span> {editMode ? "Updating..." : "Submitting..."} </span>
          ) : (
            <span> {editMode ? "Update" : "Submit"} </span>
          )}
        </button>
      </form>
      <div className="mt-4">
        <div className="flex flex-col gap-3">
          {questions?.result?.length > 0 &&
            questions?.result?.map((question: TQusetion, index: number) => (
              <div key={index} className="border p-4 rounded relative">
                {/* replies button  */}

                {tabIndex !== index && (
                  <div
                    className={
                      tabIndex == index
                        ? "absolute top-0 right-4 flex items-center gap-2"
                        : "absolute bottom-1 right-4 flex items-center gap-2"
                    }
                  >
                    {question?.replies?.length > 0 && (
                      <button
                        onClick={() => handleReplyBoxOpen(index, question?._id)}
                        className="text-xs text-green-600"
                      >
                        Replies {question?.replies?.length}
                      </button>
                    )}
                    <button
                      onClick={() => handleReplyBoxOpen(index, question?._id)}
                      className="border flex gap-1 items-center border-gray-300 shadow-sm hover:shadow rounded px-2"
                    >
                      <span className="text-xs">Write Reply</span>{" "}
                      <MdOutlineReply className="text-lg lg:text-xl" />
                    </button>
                  </div>
                )}

                {/* question section start  */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 border-b border-gray-200">
                    <h4 className="font-semibold  w-fit text-blue-600 text-sm">
                      {question?.user?.name}
                    </h4>
                    <span className="text-sm">on</span>
                    <p>
                      <span className="text-xs lg:text-sm text-gray-600">
                        {new Date(question?.createdAt).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {new Date(question?.createdAt).toLocaleTimeString(
                          "en-US",
                          { hour: "2-digit", minute: "2-digit", hour12: true }
                        )}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm ">{question?.content}</p>
                </div>
                <div
                  className={
                    question?.user?.id === data?.user?.id
                      ? "absolute top-2 right-2 flex gap-3"
                      : "hidden"
                  }
                >
                  <button
                    onClick={() => handleDelete(question?._id)}
                    className="text-red-500"
                  >
                    <FaTrashArrowUp className="text-sm lg:text-xl" />
                  </button>
                  <button
                    onClick={() => handleSetQuestion(question?._id)}
                    className="text-blue-500"
                  >
                    <PiNotePencilFill className="text-md lg:text-xl" />
                  </button>
                </div>
                {/* question section end  */}

                {/* replies form  */}
                {tabIndex == index && (
                  <form onSubmit={handleReplySubmit} className="relative mt-2">
                    <label htmlFor="" className="text-sm">
                      Write your Reply here.
                    </label>
                    <textarea
                      cols={2}
                      className="input"
                      name={"replyContent"}
                      id={"replyContent"}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        disabled={replyLoading}
                        type="submit"
                        className="btn text-xs"
                      >
                        {replyLoading ? (
                          <span>
                            {replyEditMode ? "Updating..." : "Submitting..."}
                          </span>
                        ) : (
                          <span> {replyEditMode ? "Update" : "Submit"} </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleReplyBoxClose(index)}
                        className="border flex gap-1 items-center border-gray-300 shadow-sm hover:shadow rounded px-2"
                      >
                        <span className="text-xs">Close Reply</span>
                        <MdOutlineReply size={22} />
                      </button>
                    </div>
                  </form>
                )}

                {/* replies  */}
                {tabIndex == index &&
                  question?.replies?.length > 0 &&
                  question?.replies?.map((reply, index: number) => (
                    <div
                      key={index}
                      className="border lg:p-3 p-2 rounded relative mt-2"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3 border-b border-gray-200">
                          <h4 className="font-semibold bg-pink-50 w-fit rounded shadow px-1 flex  items-center border border-gray-400 text-xs">
                            {reply?.user?.name}
                          </h4>
                          <p>
                            <span className="text-sm text-gray-600">
                              {new Date(reply?.createdAt).toLocaleDateString()}
                            </span>
                            <span className="ml-2 text-xs text-gray-400">
                              {new Date(reply?.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </span>
                          </p>
                        </div>
                        <p className="text-sm ">{reply?.content}</p>
                      </div>
                      <div
                        className={
                          reply?.user?.id === data?.user?.id
                            ? "absolute top-2 right-2 flex gap-3"
                            : "hidden"
                        }
                      >
                        <button
                          onClick={() => handleDeleteReply(reply?._id)}
                          className="text-red-500"
                        >
                          <FaTrashArrowUp className="text-sm lg:text-xl" />
                        </button>
                        <button
                          onClick={() =>
                            handleSetReply(reply?._id, question?._id)
                          }
                          className="text-blue-500"
                        >
                          <PiNotePencilFill className="text-md lg:text-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>

        {questions?.result?.length == 0 && (
          <div className="min-h-[30vh] flex flex-col justify-center items-center">
            <div>NO Question Found.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductQuestion;
