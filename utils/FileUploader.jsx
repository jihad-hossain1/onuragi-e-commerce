import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const FileUploader = ({
  setimage,
  handleOnFileUpload,
  _photo,
  handleCancelUpload,
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
          type="button"
          variant="outline"
          className="bg-green-500"
          onClick={handleOnFileUpload}
        >
          Upload image
        </Button>
      </div>
      <button className="btn w-fit" onClick={() => setShowPhoto(!showPhoto)}>
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
