import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import { NextRequest, NextResponse } from "next/server";
import { Document, FilterQuery } from "mongoose";

interface EcomDeliveryDocument extends Document {
  did: string;
  createdAt: Date;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const parsedPage = page > 0 ? page : 1;
  const parsedPageSize = pageSize > 0 ? pageSize : 10;
  const parsedSortOrder = sortOrder === "desc" ? -1 : 1;

  await connectDatabase("E-Commerce db");

  // Build search query
  const searchQuery: FilterQuery<EcomDeliveryDocument> = {};

  if (searchTerm) {
    searchQuery.$or = [{ did: { $regex: searchTerm, $options: "i" } }];
  }

  if (from && to) {
    searchQuery.createdAt = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  } else if (from) {
    searchQuery.createdAt = {
      $gte: new Date(from),
    };
  } else if (to) {
    searchQuery.createdAt = {
      $lte: new Date(to),
    };
  }

  // Calculate skip value
  const skip = (parsedPage - 1) * parsedPageSize;

  // Fetch total count
  const total = await EcomDelivery.countDocuments(searchQuery);

  // Fetch paginated data
  const data = await EcomDelivery.find(searchQuery)
    .sort({ [sortBy]: parsedSortOrder })
    .skip(skip)
    .limit(parsedPageSize);

  return NextResponse.json({
    meta: {
      total,
      page: parsedPage,
      limit: parsedPageSize,
    },
    data,
  });
}
