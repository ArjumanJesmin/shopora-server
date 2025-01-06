import { Prisma, Role, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { AdminPayload, CustomerPayload, SellerPayload } from "./user.interface";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IAuthUser, userSearchAbleFields } from "./user.constant";

//createAdmin
const createAdmin = async (payload: AdminPayload) => {
  if (!payload.admin || !payload.admin.email) {
    throw new Error("Admin details are missing or invalid");
  }
  const hashPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.admin.email,
    password: hashPassword,
    role: Role.ADMIN,
  };

  const result = await prisma.$transaction(async (tn) => {
    await tn.user.create({
      data: userData,
    });
    const createdAdminData = await tn.admin.create({
      data: {
        name: payload.admin.name,
        email: payload.admin.email,
        contactNumber: payload.admin.contactNumber,
      },
    });
    return createdAdminData;
  });

  return result;
};

//createCustomer
const createCustomer = async (payload: CustomerPayload) => {
  if (!payload.customer || !payload.customer.email) {
    throw new Error("Customer details are missing or invalid");
  }

  const hashPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.customer.email,
    password: hashPassword,
    role: Role.CUSTOMER,
  };

  const result = await prisma.$transaction(async (tn) => {
    await tn.user.create({
      data: userData,
    });

    const createdCustomerData = await tn.customer.create({
      data: {
        email: payload.customer.email,
        name: payload.customer.name,
        contactNumber: payload.customer.contactNumber,
      },
    });

    return createdCustomerData;
  });

  return result;
};

//createSeller
const createSeller = async (payload: SellerPayload) => {
  if (!payload.seller || !payload.seller.email) {
    throw new Error("Seller details are missing or invalid");
  }

  const hashPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.seller.email,
    password: hashPassword,
    role: Role.SELLER,
  };

  const result = await prisma.$transaction(async (tn) => {
    await tn.user.create({
      data: userData,
    });

    const createdSellerData = await tn.seller.create({
      data: {
        email: payload.seller.email,
        name: payload.seller.name,
        contactNumber: payload.seller.contactNumber,
        storeName: payload.seller.storeName,
      },
    });

    return createdSellerData;
  });

  return result;
};

//get all users
const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
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

//Change Profile Status
const changeProfileStatus = async (id: string, status: Role) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });
  return updateUserStatus;
};
// Show My Profile
const getMyProfile = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  let profileInfo;

  if (userInfo?.role === Role.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: user?.email,
      },
    });
  } else if (userInfo?.role === Role.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: user?.email,
      },
    });
  } else if (userInfo?.role === Role.SELLER) {
    profileInfo = await prisma.seller.findUnique({
      where: {
        email: user?.email,
      },
    });
  } else if (userInfo?.role === Role.CUSTOMER) {
    profileInfo = await prisma.customer.findUnique({
      where: {
        email: user?.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

export const UserService = {
  createAdmin,
  createCustomer,
  createSeller,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
};
