import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  payment: {
    baseUrl: process.env.AMARPAY_BASE_URL,
    merchantId: process.env.AMARPAY_MERCHANT_ID,
    storePassword: process.env.AMARPAY_STORE_PASSWORD,
    signatureKey: process.env.SIGNATURE_KEY,
    paymentUrl: process.env.PAYMENT_URL,
    storeId: process.env.STORE_ID,
    successUrl: process.env.AMARPAY_SUCCESS_URL,
    failUrl: process.env.AMARPAY_FAIL_URL,
    cancelUrl: process.env.AMARPAY_CANCEL_URL,
    verificationUrl: process.env.AMARPAY_VERIFICATION_URL,
  },
};
