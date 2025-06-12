import express from "express";
import { UserRoute } from "../modules/User/user.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CustomerRoutes } from "../modules/Customer/customer.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoute } from "../modules/Category/category.route";
import { ProductRoute } from "../modules/Product/product.route";
import { OrderRoutes } from "../modules/Order/order.route";
import { PaymentRoute } from "../modules/Payment/payment.route";

import { UserAddressRoutes } from "../modules/Address/address.route";
import { ReportRoutes } from "../modules/Report/report.route";
import { ReviewRoutes } from "../modules/Review/review.route";
import { FlashSaleRoutes } from "../modules/FlashSale/flashSale.route";
import { OfferRoutes } from "../modules/Offer/offer.route";
import { WishlistRoutes } from "../modules/Wishlist/wishlist.route";
import { BlogRoutes } from "../modules/Blog/blog.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/address",
    route: UserAddressRoutes,
  },
  {
    path: "/category",
    route: CategoryRoute,
  },
  {
    path: "/product",
    route: ProductRoute,
  },

  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoute,
  },
  {
    path: "/report",
    route: ReportRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/flash-sales",
    route: FlashSaleRoutes,
  },
  {
    path: "/offer",
    route: OfferRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
