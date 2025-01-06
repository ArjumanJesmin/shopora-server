import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtHHelpers } from "../../helpers/jwtHelpers";
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, " You are not Authorized");
      }
      const verifiedUser = jwtHHelpers.varifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, " Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
