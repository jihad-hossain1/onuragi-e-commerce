"use server";

export async function updateReviewAction(info: any){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/reviews/${info.reviewId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...info }),
      }
    );
  
    const result = await response.json();
  
    return result;
}
export async function deleteReviewAction(info: any){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/reviews/${info.reviewId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...info }),
      }
    );
  
    const result = await response.json();
  
    return result;
}