import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IAdminFilterRequest } from "../Admin/admin.interface";

type TCreateOfferPayload = {
  productId: string;
  discount: number;
  startAt: string; // Date string (e.g., "2025-06-01")
  endAt: string; // Date string (e.g., "2025-08-01")
};

// Create a new offer (convert date strings to actual Date objects)
const createOffer = async (payload: TCreateOfferPayload) => {
  const { productId, discount, startAt, endAt } = payload;

  const result = await prisma.offer.create({
    data: {
      productId,
      discount,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
    },
  });

  return result;
};

const getAllOffers = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.OfferWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          productId: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          // Optional: Search by discount if number
          discount: {
            equals: parseFloat(searchTerm),
          },
        },
      ],
    });
  }

  // Add filter conditions for other fields
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.OfferWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offer.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      product: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.offer.count({
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

// getOfferById retrieves a specific offer by its ID from the database.
const getOfferById = async (id: string) => {
  const result = await prisma.offer.findUnique({ where: { id } });
  return result;
};

// deleteExpiredOffers deletes all offers that have an end date in the past.
const deleteExpiredOffers = async () => {
  const result = await prisma.offer.deleteMany({
    where: {
      endAt: {
        lt: new Date(),
      },
    },
  });
  return result;
};

export const OfferService = {
  createOffer,
  getAllOffers,
  getOfferById,
  deleteExpiredOffers,
};
