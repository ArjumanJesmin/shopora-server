import { Product } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

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
const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const [data, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: params,
      skip,
      take: limit,
    }),
    prisma.product.count({
      where: params,
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
