import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = Router();

router.get("/", authRequired, listTransactions);
router.post("/", authRequired, createTransaction);
router.put("/:id", authRequired, updateTransaction);
router.delete("/:id", authRequired, deleteTransaction);

export default router;
