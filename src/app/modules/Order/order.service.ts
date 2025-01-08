import { Order, OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { SearchAbleFields } from "./order.constant";

// Order Create Data
const createOrder = async (payload: Order) => {
  return await prisma.order.create({
    data: {
      userId: payload.userId,
      totalAmount: payload.totalAmount,
      productIds: payload.productIds,
      status: payload.status || "PENDING",
      paymentStatus: payload.paymentStatus || "PENDING",
    },
    include: {
      user: true,
      payment: true,
    },
  });
};

// Order Get By Id  Data
const getOrderByID = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      payment: true,
    },
  });
};

// Order Get All Data
const getAllOrders = async (
  params: any,
  options: IPaginationOptions & { searchTerm?: string; [key: string]: any }
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.OrderWhereInput[] = [];

  // Add search term conditions
  if (searchTerm) {
    andConditions.push({
      OR: SearchAbleFields.map((field) => {
        const [relation, fieldName] = field.includes(".")
          ? field.split(".")
          : [null, field];
        return relation
          ? {
              [relation]: {
                [fieldName]: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            }
          : {
              [fieldName]: {
                contains: searchTerm,
                mode: "insensitive",
              },
            };
      }),
    });
  }

  // Add filter conditions
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        // Trim and validate enum fields
        const sanitizedValue = (filterData[key] || "").toString().trim();
        return {
          [key]: {
            equals: sanitizedValue,
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch paginated and filtered orders
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
      payment: true,
    },
  });

  // Get total count of orders matching the conditions
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

// Order Update Data
const updateOrder = async (id: string, data: Partial<Order>) => {
  // Validate the input data
  if (!id) {
    throw new Error("Order ID is required");
  }

  // Validate the order status
  if (data.status && !Object.values(OrderStatus).includes(data.status)) {
    throw new Error(`Invalid order status: ${data.status}`);
  }

  // Validate the payment status
  if (
    data.paymentStatus &&
    !Object.values(PaymentStatus).includes(data.paymentStatus)
  ) {
    throw new Error(`Invalid payment status: ${data.paymentStatus}`);
  }

  return await prisma.order.update({
    where: { id },
    data: {
      productIds: data.productIds || undefined,
      totalAmount: data.totalAmount || undefined,
      status: data.status || undefined,
      paymentStatus: data.paymentStatus || undefined,
    },
    include: {
      user: true,
      payment: true,
    },
  });
};

// Order Delete Data
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
