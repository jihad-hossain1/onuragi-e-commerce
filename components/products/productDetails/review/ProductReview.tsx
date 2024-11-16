'use client';

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { addReview } from "./server-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "@/components/Modal";
import { deleteReviewAction, updateReviewAction } from "./review-server-action";


const ProductReview = ({ reviews, productId }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    content: ""
  })
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await addReview({
        user: {
          id: session?.user?.id,
          name: session?.user?.name
        },
        productId: productId,
        ...formData
      });
      setLoading(false);


      if (result?.result) {
        setFormData({
          content: ""
        })
        toast.success(result?.message, {
          position: "top-center",
          style: {
            color: "green",
            padding: "10px"
          }
        })
        router.refresh()
      }

      if (result?.error) {
        toast.error(result?.error, {
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "red",
          },
        });
      }
    } catch (error) {
      setLoading(false);
      // console.error(error?.message)
    }
  }



  return <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Write your Review here.</label>
      <textarea
        cols={5}
        rows={5}
        className="input"
        name={"content"}
        id={"content"}
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />
      <button disabled={loading} type="submit" className="btn text-xs">
        {loading ? "loading..." : "Submit"}
      </button>
    </form>

    {
      reviews?.length > 0 ? <div className="flex flex-col gap-2 mt-4">
        {
          reviews?.map((review, index: number) => <div className="p-2 border rounded-md shadow" key={index}>
            <div className="flex justify-between border-b">
              <h4 className="flex items-center gap-3">
                <span className="font-semibold text-blue-600">{review?.user?.name}</span>
                <span className="flex">
                  {review?.rating == 5 && [1, 2, 3, 4, 5].map((item, ind: number) => <svg key={ind} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  )}
                </span>
              </h4>
              <div className="flex gap-3 items-center">
                <h4 className="text-gray-600 text-sm">
                  {new Date(review?.createdAt).toLocaleDateString()}
                </h4>

                <UpdateReview review={review} />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {review?.content}
            </p>

          </div>)
        }
      </div>
        :
        <div className="flex justify-center items-center min-h-[50vh]">

          <h4>
            No Review Found.
          </h4>
        </div>
    }



  </div>;
};

const UpdateReview = ({ review }) => {
  const { data } = useSession();
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    content: ""
  })
  const [reviewId, setReviewId] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [upReview, setUpReview] = useState({});


  const handleDelete = async (id: string) => {
    if (id) {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (!confirm) return;

      const result = await deleteReviewAction({ reviewId: id, user: { id: data?.user?.id } });

      if (result?.error) {
        toast.error(result?.error, {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#fff",
            color: "red",
            padding: "10px",
            borderRadius: "10px",
          },
        })
      }

      if (result?.result) {
        router.refresh();
        toast.success(result?.message, {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#fff",
            color: "green",
            padding: "10px",
            borderRadius: "10px",
          },
        })
      }
    }
  }

  const handleUpdateReview = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true)
      const result = await updateReviewAction({
        reviewId: reviewId, content: formData?.content, user: {
          id: data?.user?.id,
        }
      })
      setLoading(false)

      if (result?.error) {
        toast.error(result?.error, {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#fff",
            color: "red",
            padding: "10px",
            borderRadius: "10px",
          },
        })
      }

      if (result?.result) {
        router.refresh();
        toast.success("Update successfull.", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#fff",
            color: "green",
            padding: "10px",
            borderRadius: "10px",
          },
        })

        setTimeout(() => {
          setOpen(false);
        }, 1500);
      }

    } catch (error) {
      setLoading(false)
      console.error(error?.message)
    }
  }

  const handleModalOpen = (id: string) => {
    setOpen(!open)
    setReviewId(id)
  }



  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`/api/v1/products/reviews/${reviewId}`);
      const result = await response.json();
      if (result?.result) {
        setUpReview(result?.result)
        setFormData({
          content: result?.result?.content
        })
      }
    }

    fetchData()

  }, [reviewId])

  return (
    <div
      className={
        review?.user?.id === data?.user?.id || data?.user?.role === "admin"
          ? "flex items-center gap-1"
          : "hidden"
      }
    >
      <button
        onClick={() => handleDelete(review?._id)}
        className="text-red-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 6h-4V2H9v4H5c-1.1 0-1.99.89-1.99 2L3 20c0 1.1.89 2 1.99 2h16c1.1 0 1.99-.89 1.99-2V8c0-1.1-.89-2-1.99-2zM9 2h6v4H9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 13V9M12 9l4 4M12 9l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>
      <button
        onClick={() => handleModalOpen(review?._id)}
        className="text-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M13 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9 12H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 2v7M7 12l5 5M16 12l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>

      <Modal title={"Review Update"} open={open} setOpen={setOpen} maxWidth={undefined}>
        <form onSubmit={handleUpdateReview} >
          <label htmlFor="">Write your Review here.</label>
          <textarea
            cols={5}
            rows={8}
            className="input"
            name={"content"}
            id={"content"}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />

          <button disabled={loading} type="submit" className="btn text-xs">
            {loading ? "loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default ProductReview;
