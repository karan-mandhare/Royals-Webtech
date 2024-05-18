import { Router } from "express";
import {
  LogOutEmployee,
  LoginEmployee,
  createEmployee,
  deleteEmployee,
  getCurrentEmployee,
  updateEmployee,
} from "../controller/employee.controller.js";
import { verifyJWT } from "../middleware/employee.middleware.js";
const router = Router();

router.post("/signup", createEmployee);
router.post("/login", LoginEmployee);
router.post("/logout", verifyJWT, LogOutEmployee);
router.get("/employee", verifyJWT, getCurrentEmployee);
router.put("/update", verifyJWT, updateEmployee);
router.delete("/delete/:id", verifyJWT, deleteEmployee);

export default router;
