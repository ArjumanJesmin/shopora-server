import prisma from "../../../shared/prisma";

interface ICreateWishlistPayload {
  productIds: number[];
  sellerIds?: string[];
  customerIds?: string[];
}

const createWishlist = async (payload: ICreateWishlistPayload) => {
  return await prisma.wishlist.create({
    data: {
      productIds: payload.productIds,
      Seller: payload.sellerIds
        ? {
            connect: payload.sellerIds.map((id) => ({ id })),
          }
        : undefined,
      Customer: payload.customerIds
        ? {
            connect: payload.customerIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      Seller: true,
      Customer: true,
    },
  });
};

const getAllWishlists = async () => {
  const result = await prisma.wishlist.findMany({
    include: {
      Seller: true,
      Customer: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return result;
};

const getWishlistById = async (id: string) => {
  const result = await prisma.wishlist.findUnique({
    where: { id },
    include: {
      Seller: true,
      Customer: true,
    },
  });
  return result;
};

const deleteWishlist = async (id: string) => {
  const result = await prisma.wishlist.delete({
    where: { id },
  });
  return result;
};

export const WishlistService = {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlist,
};
