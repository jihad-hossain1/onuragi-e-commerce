"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const FileUploader = ({
  setimage,
  handleOnFileUpload,
  _photo,
  handleCancelUpload,
  updaloding,
}) => {
  const [showPhoto, setShowPhoto] = useState(false);
  return (
    <>
      <div className="flex gap-2">
        <Input
          type="file"
          name=""
          accept="image/*"
          id="image"
          onChange={(e) => setimage((prev) => e.target.files[0])}
        />
        <Button
          disabled={updaloding}
          type="button"
          variant="outline"
          className="bg-green-500"
          onClick={handleOnFileUpload}
        >
          {updaloding ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 2a10 10 0 1 0 10 10 10.01 10.01 0 0 0-10-10zM12 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
          ) : (
            "Upload"
          )}
        </Button>
      </div>
      <button
        type="button"
        className="btn w-fit"
        onClick={() => setShowPhoto(!showPhoto)}
      >
        {!showPhoto ? "Show Photo" : "Hide Photo"}
      </button>
      <div className="relative">
        {_photo && showPhoto ? (
          <div>
            <Image
              width={400}
              height={200}
              src={_photo}
              className=" object-cover rounded-md max-w-[300px]"
              alt="product photo"
            />
            <button
              type="button"
              className="absolute bg-white border text-pink-600 px-3 text-sm top-0 rounded shadow "
              onClick={() => handleCancelUpload()}
            >
              Delete this Photo
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default FileUploader;
