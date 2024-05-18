import jwt from "jsonwebtoken";
import { Employee } from "../model/employee.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ error: "Token is missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

    const employee = await Employee.findById(decodedToken?._id).select(
      "-password"
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Invalid Access Token",
      });
    }
    req.employee = employee;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
