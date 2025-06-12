import { Prisma, Report, ReportType } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IReportFilterRequest } from "./report.constant";

// create a new report
const createReport = async (payload: Report) => {
  const result = await prisma.report.create({
    data: {
      type: payload.type ?? ReportType.SALES,
      content: payload.content,
    },
  });
  return result;
};

const updateReport = async (id: string, payload: Report) => {
  const isExist = await prisma.report.findUnique({ where: { id } });

  if (!isExist) {
    throw new Error("Report not found!");
  }

  const updatedReport = await prisma.report.update({
    where: { id },
    data: {
      ...payload,
    },
  });

  return updatedReport;
};

// This service handles report-related database operations
const getAllFromDB = async (
  params: IReportFilterRequest,
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
            equals: searchTerm.toUpperCase() as ReportType,
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

export const ReportService = {
  createReport,
  getAllFromDB,
  getByIdFromDB,
  updateReport,
};
