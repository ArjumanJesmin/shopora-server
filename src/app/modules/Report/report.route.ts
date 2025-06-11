import express from "express";
import { ReportController } from "./report.controller";

const router = express.Router();

router.get("/", ReportController.getAllFromDB);
router.get("/:id", ReportController.getByIdFromDB);
router.post("/", ReportController.createReport);

export const ReportRoutes = router;
