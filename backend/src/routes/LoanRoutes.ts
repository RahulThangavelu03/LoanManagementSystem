import express from "express";
import { applyLoan,sanctionLoan,rejectLoan } from "../controllers/LoanControllers";

import {
  protect
} from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/apply",

  protect,

  applyLoan
);

router.put(
  "/sanction/:id",

  protect,

  sanctionLoan
);

router.put(
  "/reject/:id",

  protect,

  rejectLoan
);
export default router;