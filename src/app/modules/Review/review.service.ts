import { Prisma, Review } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IReviewFilterRequest } from "./review.constant";

const createReview = async (payload: Review) => {
  const result = await prisma.review.create({
    data: {
      userId: payload.userId,
      productId: payload.productId,
      sellerId: payload.sellerId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
  return result;
};

const getAllFromDB = async (
  params: IReviewFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          comment: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          rating: {
            equals: Number(searchTerm),
          },
        },
      ],
    });
  }

  // Filter logic for other fields (e.g., userId, productId, etc.)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
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

  const total = await prisma.review.count({
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

const getByIdFromDB = async (id: string): Promise<Review | null> => {
  return await prisma.review.findUnique({
    where: { id },
  });
};

export const ReviewService = {
  createReview,
  getAllFromDB,
  getByIdFromDB,
};
