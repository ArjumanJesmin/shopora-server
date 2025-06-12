import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { ICategoryFilterRequest } from "./category.constants";

// Create a new category
const createCategoryFromDB = async (payload: Category) => {
  const existingCategory = await prisma.category.findUnique({
    where: { name: payload.name },
  });

  if (existingCategory) {
    throw new Error(`Category "${payload.name}" already exists.`);
  }

  // Create the category if it doesn't exist
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllFromDB = async (
  params: ICategoryFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm } = params;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [data, total] = await prisma.$transaction([
    prisma.category.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: "desc" },
    }),
    prisma.category.count({ where: whereConditions }),
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

const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

const updateCategory = async (id: string, data: Category) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategoryFromDB,
  getAllFromDB,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
