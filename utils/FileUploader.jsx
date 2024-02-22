import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const FileUploader = ({
  setimage,
  handleOnFileUpload,
  _photo,
  handleCancelUpload,
}) => {
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

      <div className="relative">
        {_photo ? (
          <div>
            <Image
              width={400}
              height={200}
              src={_photo}
              className="w-full object-cover rounded-md"
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
