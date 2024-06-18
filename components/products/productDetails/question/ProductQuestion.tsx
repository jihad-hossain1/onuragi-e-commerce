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

const ProductQuestion = ({ questions, productId }) => {
  console.log("🚀 ~ ProductQuestion ~ questions:", questions);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [questionId, setQuestionId] = useState("");

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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Write your Question here.</label>
        <textarea
          cols={2}
          className="input"
          name={"content"}
          id={"content"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button disabled={loading} type="submit" className="btn">
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
            questions?.result?.map(
              (
                question: {
                  content: string;
                  _id: string;
                  createdAt: string;
                  user: { name: string; id: string; _id: string };
                },
                index: number
              ) => (
                <div key={index} className="border p-4 rounded relative">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3 border-b border-gray-200">
                      <h4 className="font-semibold bg-pink-50 w-fit rounded shadow px-1 flex  items-center border border-gray-400 text-xs">
                        {question?.user?.name}
                      </h4>
                      <p>
                        <span className="text-sm text-gray-600">
                          {new Date(question?.createdAt).toLocaleDateString()}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">
                          {new Date(question?.createdAt).toLocaleTimeString(
                            "en-US",
                            { hour: "numeric", minute: "numeric", hour12: true }
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
                      <FaTrashArrowUp size={20} />
                    </button>
                    <button
                      onClick={() => handleSetQuestion(question?._id)}
                      className="text-blue-500"
                    >
                      <PiNotePencilFill size={22} />
                    </button>
                  </div>
                </div>
              )
            )}
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
