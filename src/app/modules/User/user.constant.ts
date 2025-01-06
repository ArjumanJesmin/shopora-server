import { Role } from "@prisma/client";

export const userSearchAbleFields: string[] = ["email"];

export const userFilterAbleFields = ["email", "role", "status", "searchTerm"];

export type IAuthUser = {
  email: string;
  role: Role;
} | null;
