import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IAdminFilterRequest } from "../Admin/admin.interface";

const getAllFromDB = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.FlashSaleWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          product: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.FlashSaleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.flashSale.findMany({
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
    include: { product: true },
  });

  const total = await prisma.flashSale.count({
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

const getByIdFromDB = async (id: string) => {
  const result = await prisma.flashSale.findUnique({
    where: { id },
    include: { product: true },
  });
  return result;
};

const createFlashSale = async (payload: {
  productId: string;
  discount: number;
  startAt: Date;
  endAt: Date;
}) => {
  const result = await prisma.flashSale.create({
    data: payload,
    include: { product: true },
  });
  return result;
};

const updateFlashSale = async (
  id: string,
  payload: Partial<{
    discount: number;
    startAt: Date;
    endAt: Date;
  }>
) => {
  const result = await prisma.flashSale.update({
    where: { id },
    data: payload,
    include: { product: true },
  });
  return result;
};

const deleteFlashSale = async (id: string) => {
  await prisma.flashSale.delete({
    where: { id },
  });
};

export const FlashSaleService = {
  getAllFromDB,
  getByIdFromDB,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale,
};
