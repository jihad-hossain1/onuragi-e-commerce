"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { FaAddressBook, FaPhotoFilm, FaServicestack } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

const DropDownAction = ({ productID, specification, details }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Product action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-3 my-3">
            {
              <DropdownMenuItem>
                {details ? (
                  <Link
                    href={`/dashboard/product-manage/add-product-details/${productID}=${details}`}
                    className="flex gap-2 items-center"
                  >
                    <span>Update Details</span>{" "}
                    <FaAddressBook size={20} className="text-blue-600" />
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/product-manage/add-product-details/${productID}`}
                    className="flex gap-2 items-center"
                  >
                    <span>Add Details</span>{" "}
                    <FaAddressBook size={20} className="text-blue-600" />
                  </Link>
                )}
              </DropdownMenuItem>
            }

            <DropdownMenuItem>
              {specification ? (
                <Link
                  href={`/dashboard/product-manage/add-specification/${productID}=${specification}`}
                  className="flex gap-2 items-center"
                >
                  <span>Update Spec.</span>{" "}
                  <FaServicestack size={20} className="text-blue-600" />
                </Link>
              ) : (
                <Link
                  href={`/dashboard/product-manage/add-specification/${productID}`}
                  className="flex gap-2 items-center"
                >
                  <span>Add Spec.</span>{" "}
                  <FaServicestack size={20} className="text-blue-600" />
                </Link>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={`/dashboard/product-manage/addproduct-image/${productID}`}
                className="flex gap-2 items-center"
              >
                <span>Add Image</span>
                <FaPhotoFilm size={20} className="text-cyan-600" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/product-manage/edit-product/${productID}`}
                className="flex gap-2 items-center"
              >
                <span>Edit Product</span>
                <HiPencilAlt size={20} className="text-green-600" />
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownAction;
