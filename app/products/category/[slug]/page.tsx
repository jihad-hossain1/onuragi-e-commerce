import React from "react";

const SingleCategorypage = ({ params }) => {
  return (
    <main className="min-h-screen max-w-screen-xl mx-auto px-4">
      <h4>{params.slug}</h4>
    </main>
  );
};

export default SingleCategorypage;
