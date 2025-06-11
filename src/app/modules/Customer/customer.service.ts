import { Customer, Prisma } from "@prisma/client";

import prisma from "../../../shared/prisma";

import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { adminSearchAbleFields } from "../Admin/admin.constant";
import { IAdminFilterRequest } from "../Admin/admin.interface";

const getAllFromDB = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.CustomerWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
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

  const whereConditions: Prisma.CustomerWhereInput = { AND: andConditions };

  const result = await prisma.customer.findMany({
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
  });

  const total = await prisma.customer.count({
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

const getByIdFromDB = async (id: string): Promise<Customer | null> => {
  const result = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
  return result;
};

const updateCustomerData = async (
  id: string,
  payload: any
): Promise<Customer | null> => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!customerInfo?.user) {
    throw new Error("User associated with this customer not found");
  }

  const userId = customerInfo.user.id;

  const { customerData, userData, ...restData } = payload;

  const updatedCustomer = await prisma.customer.update({
    where: {
      id,
    },
    data: {
      ...customerData,
    },
    include: {
      user: true,
    },
  });

  if (userData) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userData,
      },
    });
  }
  return updatedCustomer;
};

export const CustomerService = {
  getAllFromDB,
  getByIdFromDB,
  updateCustomerData,
};
