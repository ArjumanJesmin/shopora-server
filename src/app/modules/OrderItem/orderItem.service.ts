import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TOrderItem } from "./orderItem.interface";

const createOrderItem = async (data: TOrderItem) => {
  return await prisma.orderItem.create({
    data,
    include: {
      product: true,
      order: true,
    },
  });
};

const getAllOrderItems = async (options: IPaginationOptions) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const skip = (page - 1) * limit;

  const orderItems = await prisma.orderItem.findMany({
    skip,
    take: limit,
    include: {
      product: true,
      order: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.orderItem.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: orderItems,
  };
};

// Get a single OrderItem by ID
const getOrderItemById = async (id: string) => {
  return await prisma.orderItem.findUnique({
    where: { id },
    include: {
      product: true,
      order: true,
    },
  });
};

// Update an OrderItem by ID
const updateOrderItem = async (
  id: string,
  data: { quantity?: number; orderId?: string; productId?: string }
) => {
  return await prisma.orderItem.update({
    where: { id },
    data,
    include: {
      product: true,
      order: true,
    },
  });
};

// Delete an OrderItem by ID
const deleteOrderItem = async (id: string) => {
  return await prisma.orderItem.delete({
    where: { id },
  });
};

export const OrderItemService = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
