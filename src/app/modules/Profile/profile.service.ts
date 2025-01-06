import prisma from "../../../shared/prisma";

// Create a new Profile
const createProfile = async (bio: string, userId: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  return await prisma.profile.create({
    data: {
      bio,
      userId,
    },
    include: {
      user: true,
    },
  });
};

// Get a Profile by its ID
const getProfileById = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};

// Update a Profile by ID
const updateProfile = async (id: string, bio: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return await prisma.profile.update({
    where: { id },
    data: { bio },
    include: {
      user: true,
    },
  });
};

// Delete a Profile by ID
const deleteProfile = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return await prisma.profile.delete({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const ProfileService = {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
};
