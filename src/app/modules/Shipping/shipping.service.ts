import { Shipping } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createShipping = async (payload: Shipping) => {
  const shipping = await prisma.shipping.create({
    data: {
      address: payload.address,
      city: payload.city,
      state: payload.state,
      country: payload.country,
      postalCode: payload.postalCode,
      orderId: payload.orderId,
    },
    include: {
      order: true,
    },
  });
  return shipping;
};

// Get a single shipping record by ID
const getShippingById = async (id: string) => {
  return await prisma.shipping.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
};

// Get all shipping records (with pagination)
const getAllShippings = async (options: any) => {
  const { skip, limit, sortBy = "createdAt", sortOrder = "desc" } = options;

  const shippings = await prisma.shipping.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      order: true,
    },
  });

  const total = await prisma.shipping.count();

  return {
    data: shippings,
    meta: {
      total,
      page: Math.floor(skip / limit) + 1,
      limit,
    },
  };
};

// Update a shipping record by ID
const updateShipping = async (id: string, data: any) => {
  return await prisma.shipping.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

// Delete a shipping record by ID
const deleteShipping = async (id: string) => {
  return await prisma.shipping.delete({
    where: { id },
  });
};

export const ShoppingService = {
  createShipping,
  getAllShippings,
  updateShipping,
  getShippingById,
  deleteShipping,
};
