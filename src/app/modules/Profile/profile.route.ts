// src/app/modules/Profile/profile.routes.ts
import { Router } from "express";
import { ProfileController } from "./profile.controller";

const router = Router();

router.post("/profiles", ProfileController.createProfile);

router.get("/profiles/:id", ProfileController.getProfile);

router.put("/profiles/:id", ProfileController.updateProfile);

router.delete("/profiles/:id", ProfileController.deleteProfile);

export const ProfileRoute = router;
