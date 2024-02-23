import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EditProduct from "@/components/Dashboard/productMange/productAction/EditProduct";
import AddDetails from "@/components/Dashboard/productMange/productAction/AddDetails";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export function Products({ products, categories }) {
  return (
    <>
      <h4>Total Products: {products ? products?.length || 0 : {}} </h4>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product?._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <Image
                  src={product?.image}
                  alt="prouct iamge"
                  height={50}
                  width={50}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell className="font-medium">{product?.name}</TableCell>
              <TableCell>{product?.categoryID?.name || "no data"}</TableCell>
              <TableCell>{product?._id}</TableCell>
              <TableCell className="text-right">{product?.price}</TableCell>
              <TableCell className="text-right">
                <div>
                  {/* edit product  */}
                  <EditProduct product={product} categories={categories} />
                </div>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-transparent dark:hover:bg-transparent dark:bg-transparent border-none "
                    >
                      <HiOutlineDotsHorizontal size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem></DropdownMenuItem>
                    <DropdownMenuItem>
                      <AddDetails />
                    </DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              Total {products ? products?.length || 0 : {}}
            </TableCell>
            <TableCell className="text-right">0</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
