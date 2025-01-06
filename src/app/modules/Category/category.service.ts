import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

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

const getAllFromDB = async () => {
  return await prisma.category.findMany();
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
