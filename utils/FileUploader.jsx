import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const FileUploader = ({ setimage, handleOnFileUpload }) => {
  return (
    <>
      <Input
        type="file"
        name=""
        accept="image/*"
        id="image"
        onChange={(e) => setimage((prev) => e.target.files[0])}
      />
      <Button variant="outlined" onClick={handleOnFileUpload}>
        upLoad
      </Button>
    </>
  );
};

export default FileUploader;
