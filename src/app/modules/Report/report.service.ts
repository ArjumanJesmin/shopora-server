import { Prisma, ReportType } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IAdminFilterRequest } from "../Admin/admin.interface";
import { paginationHelper } from "../../../helpers/paginationHelper";

// This service handles report-related database operations
const getAllFromDB = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ReportWhereInput[] = [];

  // Search logic on content or type, for example:
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          type: {
            equals: searchTerm.toUpperCase() as ReportType, // if you want to filter by enum type string
          },
        },
      ],
    });
  }

  // Filter exact matches on other fields (e.g., type)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ReportWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.report.findMany({
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

  const total = await prisma.report.count({
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

// get a report by ID
const getByIdFromDB = async (id: string) => {
  const result = await prisma.report.findUnique({
    where: { id },
  });
  return result;
};

// create a new report
const createReport = async (payload: {
  type?: ReportType; // optional, defaults to SALES
  content: string;
}) => {
  const result = await prisma.report.create({
    data: {
      type: payload.type ?? ReportType.SALES,
      content: payload.content,
    },
  });
  return result;
};
export const ReportService = {
  getAllFromDB,
  getByIdFromDB,
  createReport,
};
