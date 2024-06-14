'use client'

import {
  server_action,
  update_server_action,
} from "@/app/(dashboard)/dashboard/product-manage/add-specification/_compo/server-action";
import InputField from "@/components/ui/InputField";
import { validatedTag } from "@/helpers/validated-tag";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
type ProductIDProps = {
  productID: string;
  specId: string[];
  specValue: any;
};
const AddSpecification: React.FC<ProductIDProps> = ({
  productID,
  specId,
  specValue,
}) => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    sleeve: "",
    valueAddition: "",
    coller_Neck: "",
    sideCut: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [care, setCare] = React.useState(
    specValue?.care ? specValue?.care : []
  );
  const [addCare, setAddCare] = React.useState("");
  const [febric, setFebric] = React.useState(
    specValue?.febric ? specValue?.febric : []
  );
  const [addFebric, setAddedFebric] = React.useState("");

  useEffect(() => {
    if (specValue) {
      setFormData({
        sleeve: specValue?.sleeve,
        valueAddition: specValue?.valueAddition,
        coller_Neck: specValue?.coller_Neck,
        sideCut: specValue?.sideCut,
      });
    }
  }, [specValue]);

  function getCare() {
    if (addCare === "" || !addCare) {
      toast("Enter Care");
      return;
    }
    setCare([...care, addCare]);
    setAddCare("");
  }

  function removeCare() {
    setCare(care.slice(0, -1));
  }

  function getFebric() {
    if (addFebric === "" || !addFebric) {
      toast("Enter Febric");
      return;
    }
    setFebric([...febric, addFebric]);
    setAddedFebric("");
  }

  function removeFebric() {
    setFebric(febric.slice(0, -1));
  }

  async function handleSubmit() {
    try {
      if (specId) {
        setLoading(true);
        const response = await update_server_action({
          ...formData,
          care: care,
          febric: febric,
          specId: specId,
        });
        setLoading(false);

        if (response?.update) {
          validatedTag("specification");
          toast(response?.message);
          router.refresh();
        }

        if (response?.error) {
          setLoading(false);
          toast(response?.error);
          router.refresh();
        }
      } else {
        setLoading(true);
        const response = await server_action({
          ...formData,
          productID: productID,
          care: care,
          febric: febric,
        });

        setLoading(false);

        if (response) {
          toast(response?.message);
          // validatedTag("specification")
          validatedTag("products");
          router.refresh();
          router.push("/dashboard/product-manage");
        } else {
          toast(response?.message);
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error?.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl m-auto p-4">
      <h1 className="text-2xl font-bold">
        {" "}
        {specId ? "Update" : "Add"} Specification
      </h1>
      <InputField
        label="sleeve"
        type="text"
        name="sleeve"
        value={formData?.sleeve}
        onChange={(e) => setFormData({ ...formData, sleeve: e.target.value })}
        id={""}
      />

      <InputField
        label="valueAddition"
        type="text"
        name="valueAddition"
        value={formData?.valueAddition}
        onChange={(e) =>
          setFormData({ ...formData, valueAddition: e.target.value })
        }
        id={""}
      />

      <InputField
        label="coller_Neck"
        type="text"
        name="coller_Neck"
        value={formData?.coller_Neck}
        onChange={(e) =>
          setFormData({ ...formData, coller_Neck: e.target.value })
        }
        id={""}
      />

      <InputField
        label="sideCut"
        type="text"
        name="sideCut"
        value={formData?.sideCut}
        onChange={(e) => setFormData({ ...formData, sideCut: e.target.value })}
        id={""}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <InputField
            label="care"
            type="text"
            name="care"
            value={addCare}
            onChange={(e) => setAddCare(e.target.value)}
            id={""}
          />

          <button className="btn w-fit" onClick={getCare} type="button">
            Add
          </button>
        </div>
        {care?.map((item, index) => (
          <p key={index} className="text-sm flex items-center gap-4">
            <p>{item}</p>
            <button onClick={removeCare} className="text-pink-600">
              <FaTrash />
            </button>
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <InputField
            label="febric"
            type="text"
            name="febric"
            value={addFebric}
            onChange={(e) => setAddedFebric(e.target.value)}
            id={""}
          />

          <button className="btn w-fit" onClick={getFebric} type="button">
            Add
          </button>
        </div>
        {febric?.map((item, index) => (
          <p key={index} className="text-sm flex items-center gap-4">
            <p>{item}</p>
            <button onClick={removeFebric} className="text-pink-600">
              <FaTrash />
            </button>
          </p>
        ))}
      </div>

      <button disabled={loading} className="btn" onClick={handleSubmit}>
        {specId ? (
          <span> {loading ? "Updating..." : "Update"} </span>
        ) : (
          <span>{loading ? "Adding..." : "Add"}</span>
        )}
      </button>
    </div>
  );
};

export default AddSpecification