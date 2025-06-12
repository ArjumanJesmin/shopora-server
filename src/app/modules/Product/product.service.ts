import { Prisma, Product } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IProductFilterRequest } from "./product.constant";

// Create product in DB
const createProductFromDB = async (payload: Product) => {
  // Check if Category exists
  const categoryExists = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!categoryExists) {
    throw new Error("Category with the provided categoryId does not exist.");
  }

  // Create Product
  const result = await prisma.product.create({
    data: payload,
  });

  return result;
};

// Get all products from DB
const getAllFromDB = async (
  params: IProductFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const {
    searchTerm,
    minPrice,
    maxPrice,
    hasOffer,
    hasFlashSale,
    ...filterData
  } = params;

  const andConditions: Prisma.ProductWhereInput[] = [];

  // Search logic: name or description
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Price filter
  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: minPrice,
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: maxPrice,
      },
    });
  }

  // Offer filter
  if (hasOffer) {
    andConditions.push({
      offer: {
        isNot: null,
      },
    });
  }

  // Flash sale filter
  if (hasFlashSale) {
    andConditions.push({
      flashSale: {
        isNot: null,
      },
    });
  }

  // Other field filters like categoryId, stock
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [data, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: "desc",
            },
    }),
    prisma.product.count({
      where: whereConditions,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

// Get product by ID from DB
const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

// Update product in DB
const updateProduct = async (id: string, data: Product) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

// Delete product from DB
const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProductFromDB,
  getAllFromDB,
  getProductById,
  updateProduct,
  deleteProduct,
};
