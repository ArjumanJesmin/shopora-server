import { Blog, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { BlogFilterRequest } from "./blog.constant";

const createBlog = async (payload: Blog) => {
  const result = await prisma.blog.create({
    data: {
      title: payload.title,
      content: payload.content,
      sellerId: payload.sellerId || undefined,
      customerId: payload.customerId || undefined,
    },
  });
  return result;
};

const getAllBlogs = async (
  params: BlogFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.BlogWhereInput[] = [];

  // 🔍 Search logic on title or content
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // 🎯 Filter exact matches (e.g., sellerId, customerId)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            updatedAt: "desc",
          },
    include: {
      Seller: true,
      Customer: true,
    },
  });

  const total = await prisma.blog.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBlog = async (id: string) => {
  const result = await prisma.blog.findUnique({
    where: { id },
    include: {
      Seller: true,
      Customer: true,
    },
  });
  return result;
};

const deleteBlog = async (id: string) => {
  const result = await prisma.blog.delete({
    where: { id },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
};
