"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddCategory = async () => {
    if (name == "") {
      return alert("name is required");
    }

    const res = await axios.post("/api/v1/category", { name: name });
    console.log(res);

    if (res?.data?.status === 201) {
      router.refresh();
      toast.success("Category added Successfull");
      setname("");
      setIsOpen(false);
    } else {
      setError(res?.data?.message);
      toast.error(res?.data?.message);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        varient="outline"
        className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 my-4"
      >
        Add Category
      </Button>

      <Modal open={isOpen} setOpen={setIsOpen} title={"Add Category"}>
        <div className="flex flex-col gap-3">
          <h4 className="text-xs text-pink-600">{error ? error : ""}</h4>
          <Input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-transparent"
          />

          <Button
            onClick={handleAddCategory}
            type="submit"
            size="sm"
            varient="outline"
            className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90 uppercase"
          >
            create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;

