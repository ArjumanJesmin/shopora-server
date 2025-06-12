import express from "express";
import { ReportController } from "./report.controller";

const router = express.Router();

router.post("/", ReportController.createReport);
router.patch("/:id", ReportController.updateReport);
router.get("/", ReportController.getAllFromDB);
router.get("/:id", ReportController.getByIdFromDB);

export const ReportRoutes = router;
