import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import {
  linkBank,
  importMockTransactions,
} from "../controllers/bankIntegrationController.js";

const router = Router();

router.post("/link", authRequired, linkBank);
router.post("/import-mock", authRequired, importMockTransactions);

export default router;
