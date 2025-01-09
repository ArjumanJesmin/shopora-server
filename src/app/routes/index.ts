import express from "express";
import { UserRoute } from "../modules/User/user.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CustomerRoutes } from "../modules/Customer/customer.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoute } from "../modules/Category/category.route";
import { ProductRoute } from "../modules/Product/product.route";
import { ShoppingRoute } from "../modules/Shipping/shipping.route";
import { OrderRoutes } from "../modules/Order/order.route";
import { PaymentRoute } from "../modules/Payment/payment.route";
import { ProfileRoute } from "../modules/Profile/profile.route";
import { UserAddressRoutes } from "../modules/Address/address.route";

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
    path: "/shopping",
    route: ShoppingRoute,
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
    path: "/profile",
    route: ProfileRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
