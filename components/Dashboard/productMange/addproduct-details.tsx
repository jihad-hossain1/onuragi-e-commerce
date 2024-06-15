'use client'

import Container from "@/components/ui/container";
import React from "react";
import AddSizes from "./add-sizes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { validatedTag } from "@/helpers/validated-tag";
import { add_server_action } from "@/app/(dashboard)/dashboard/product-manage/add-product-details/_compo/addServerAction";
import { update_server_action } from "@/app/(dashboard)/dashboard/product-manage/add-product-details/_compo/updateServerAction";
import Link from "next/link";
import InputField from "@/components/ui/InputField";

type ProductsProps = {
  productID: string;
  detailId: string;
  detailValue: any;
};

const AddproductDetails: React.FC<ProductsProps> = ({
  productID,
  detailId,
  detailValue,
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    about: "",
    sizeGuide: "",
  });

  const [sizes, setSizes] = React.useState(detailValue?.sizes || []);

  React.useEffect(() => {
    if (detailValue) {
      setFormData({
        about: detailValue?.about || "",
        sizeGuide: detailValue?.sizeGuide || "",
      });
    }
  }, [detailValue]);

  async function handleSubmit() {
    try {
      if (detailId) {
        setLoading(true);
        const response = await update_server_action({
          ...formData,
          sizes: sizes,
          detailId: detailId,
        });

        console.log("response ", response);

        setLoading(false);

        if (response?.result) {
          toast(response?.message);
          validatedTag("products");
          router.refresh();
        }

        if (response?.error) {
          toast(response?.error);
          router.refresh();
        }
      } else {
        setLoading(true);
        const response = await add_server_action({
          ...formData,
          sizes: sizes,
          productID: productID,
        });

        setLoading(false);

        if (response?.result) {
          toast(response?.message);
          validatedTag("products");
          router.refresh();
        }
        if (response?.error) {
          toast(response?.error);
          router.refresh();
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error?.message);
    }
  }

  return (
    <Container>
      <div className="flex justify-start my-10">
        <Link href="/dashboard/product-manage">
          <button className="btn ">Back</button>
        </Link>
      </div>
      <h4 className="text-2xl text-center my-8">
        {" "}
        {detailId ? "UPDATE" : "ADD"} product Details
      </h4>

      <section className="flex flex-col gap-4 max-w-xl m-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="sizeGuide">Size Guide</label>
          <input
            className="input"
            placeholder="Enter size Guide or image link"
            type="text"
            name="sizeGuide"
            value={formData.sizeGuide}
            onChange={(e) =>
              setFormData({ ...formData, sizeGuide: e.target.value })
            }
            id="sizeGuide"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="About">About</label>
          <textarea
            className="input"
            placeholder="Enter About"
            name="About"
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            id="About"
            maxLength={800}
            rows={5}
            cols={50}
          />
        </div>

        <AddSizes sizes={sizes} setSizes={setSizes} />

        <div>
          <button
            disabled={loading}
            onClick={handleSubmit}
            type="submit"
            className="btn"
          >
            {detailId ? (
              <span> {loading ? "Updating..." : "Update"} </span>
            ) : (
              <span> {loading ? "Adding..." : "Add"} </span>
            )}
          </button>
        </div>
      </section>
    </Container>
  );
};

const AddColors = ({ colors, setColors }: any) => {
  const [colorData, setColorData] = React.useState({
    color: "",
    quantity: "",
  });

  const addColor = () => {
    if (!colorData.color || !colorData.quantity) {
      toast("All fields are required");
      return;
    }
    if (+colorData.quantity <= 0) {
      toast("Please One or more quantity");
      return;
    }

    setColors([
      ...colors,
      { ...colorData, quantity: Number(colorData.quantity) },
    ]);

    setColorData({ color: "", quantity: "" });
  };

  const remove = () => {
    setColors(colors.slice(0, -1));
  };

  return (
    <main>
      <div className="flex items-center gap-2">
        <InputField
          label="Color"
          name="color"
          value={colorData.color}
          onChange={(e) =>
            setColorData({ ...colorData, color: e.target.value })
          }
          type="text"
          id="color"
        />

        <InputField
          label="Quantity"
          name="quantity"
          value={colorData.quantity}
          onChange={(e) =>
            setColorData({ ...colorData, quantity: e.target.value })
          }
          type="number"
          id="quantity"
        />

        <div className="flex flex-col gap-2">
          <button type="button" onClick={addColor} className="btn  mt-3 pt-3">
            +
          </button>
        </div>
      </div>

      {colors?.map((color, index) => (
        <div key={index} className="flex  gap-2 items-center">
          <h4>
            {color?.color} : {color?.quantity}
          </h4>
          <button
            type="button"
            onClick={() => remove()}
            className="text-xs text-pink-600"
          >
            Remove
          </button>
        </div>
      ))}
    </main>
  );
};

export default AddproductDetails