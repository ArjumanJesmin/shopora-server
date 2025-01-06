import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "../Admin/admin.constant";

import { TOrder, TOrderData } from "./order.interface";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";

const createOrder = async (payload: TOrder) => {
  return await prisma.order.create({
    data: {
      total: payload.total,
      userId: payload.userId,
      orderItems: {
        create: payload.orderItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      user: true,
      orderItems: true,
      payment: true,
      shipping: true,
    },
  });
};

const getOrderByID = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
      shipping: true,
    },
  });
};

export const getAllOrders = async (options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  // Set up empty conditions (add filters if needed)
  const andConditions: Prisma.OrderWhereInput[] = [];

  const whereConditions: Prisma.OrderWhereInput = { AND: andConditions };

  // Fetch paginated orders with sorting
  const result = await prisma.order.findMany({
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
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
      shipping: true,
    },
  });

  // Get total order count for meta information
  const total = await prisma.order.count({
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

const updateOrder = async (id: string, data: TOrderData) => {
  return await prisma.order.update({
    where: { id },
    data: {
      ...data,
      orderItems: data.orderItems
        ? {
            deleteMany: {},
            create: data.orderItems,
          }
        : undefined,
    },
    include: {
      user: true,
      orderItems: true,
      payment: true,
      shipping: true,
    },
  });
};

const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderByID,
  updateOrder,
  deleteOrder,
};
