import prisma from "../../../shared/prisma";
import { AddressPayload } from "./address.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

// User Address Create Data
const createAddress = async (payload: AddressPayload) => {
  const existingAddress = await prisma.address.findFirst({
    where: { userId: payload.userId },
  });

  if (existingAddress) {
    throw new Error(
      "User already has an address. Only one address is allowed per user."
    );
  }

  const result = await prisma.address.create({
    data: {
      userId: payload.userId,
      type: payload.type || "SHIPPING",
      address: payload.address,
      city: payload.city,
      state: payload.state,
      country: payload.country,
      zipCode: payload.zipCode,
    },
    include: {
      user: true,
    },
  });
  return result;
};

// Update User Address
const updateAddress = async (id: string, payload: AddressPayload) => {
  const existingAddress = await prisma.address.findUnique({
    where: { id },
  });

  if (!existingAddress) {
    throw new Error("Address not found. Unable to update.");
  }

  const updatedAddress = await prisma.address.update({
    where: { id },
    data: {
      ...payload,
      updatedAt: new Date(),
    },
  });

  return updatedAddress;
};

// All User Addresses
const getAllAddresses = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const [data, total] = await prisma.$transaction([
    prisma.address.findMany({
      where: params,
      skip,
      take: limit,
    }),
    prisma.address.count({
      where: params,
    }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getAddressById = async (id: string) => {
  const result = await prisma.address.findUnique({
    where: { id },
  });
  return result;
};

const deleteAddress = async (id: string) => {
  const result = await prisma.address.delete({
    where: { id },
  });
  return result;
};

export const AddressService = {
  createAddress,
  updateAddress,
  getAllAddresses,
  getAddressById,
  deleteAddress,
};
