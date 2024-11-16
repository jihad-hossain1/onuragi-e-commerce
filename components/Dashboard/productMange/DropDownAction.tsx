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


const DropDownAction = ({ productID, specification, details }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 12h12M6 8h12M6 16h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M19 3H5c-1.1 0-1.99.89-1.99 2L3 19c0 1.1.89 2 1.99 2h14c1.1 0 1.99-.89 1.99-2V5c0-1.1-.89-2-1.99-2zM5 5h14v14H5V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 7h8M8 11h8M8 15h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/product-manage/add-product-details/${productID}`}
                    className="flex gap-2 items-center"
                  >
                    <span>Add Details</span>{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M19 3H5c-1.1 0-1.99.89-1.99 2L3 19c0 1.1.89 2 1.99 2h14c1.1 0 1.99-.89 1.99-2V5c0-1.1-.89-2-1.99-2zM5 5h14v14H5V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 7h8M8 11h8M8 15h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M6 12h12M6 16h12M6 8h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 6h12V4H6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </Link>
              ) : (
                <Link
                  href={`/dashboard/product-manage/add-specification/${productID}`}
                  className="flex gap-2 items-center"
                >
                  <span>Add Spec.</span>{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M6 12h12M6 16h12M6 8h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 6h12V4H6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </Link>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={`/dashboard/product-manage/addproduct-image/${productID}`}
                className="flex gap-2 items-center"
              >
                <span>Add Image</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M18 2H6c-1.1 0-1.99.89-1.99 2L4 20c0 1.1.89 2 1.99 2h12c1.1 0 1.99-.89 1.99-2V4c0-1.1-.89-2-1.99-2zM6 4h12v16H6V4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 8h6v4H9zm0 6h6v2H9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/product-manage/edit-product/${productID}`}
                className="flex gap-2 items-center"
              >
                <span>Edit Product</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 20h9M12 20l-3-3m3 3l-3-3M16.5 3.5l4 4L7 17l-4-4 13.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownAction;
