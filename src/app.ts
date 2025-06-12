import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { OfferService } from "./app/modules/Offer/offer.service";

const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Shopping management  server....",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

cron.schedule("0 * * * *", async () => {
  try {
    const result = await OfferService.deleteExpiredOffers();
    console.log(`[CRON] ${result.count} টা শেষ হওয়া Offer ডিলিট হয়েছে`);
  } catch (err) {
    console.error("Offer অটো-ডিলিটে সমস্যা:", err);
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
