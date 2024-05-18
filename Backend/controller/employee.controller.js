import { Employee } from "../model/employee.model.js";

const generateAccessTokens = async (empId) => {
  try {
    const employee = await Employee.findById(empId);
    const accessToken = employee.generateAccessToken();

    await employee.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, gender, dob, password } = req.body;
    if (!name || !email || !gender || !dob || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existedEmployee = await Employee.findOne({ email });

    if (existedEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee with email already exist",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      gender,
      dob,
      password,
    });

    const createdEmployee = await Employee.findById(employee._id).select(
      "-password"
    );

    if (!createdEmployee) {
      res.status(400).json({
        success: false,
        message: "Error while creating employee",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sign Up Successfully",
      createdEmployee,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const LoginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email or password are required",
      });
    }
    const employee = await Employee.findOne({ email: email });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "email is invalid",
      });
    }

    const isPasswordValid = await employee.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // generate jwt token
    const { accessToken } = await generateAccessTokens(employee._id);

    const loggedInEmployee = await Employee.findById(employee._id).select(
      "-password"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        employee: [loggedInEmployee, accessToken],
        message: "Employee logged in successfully",
      });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const LogOutEmployee = async (req, res) => {
  await Employee.findByIdAndUpdate(req.employee._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).clearCookie("accessToken", options).json({
    success: true,
    message: "Employee logged out",
    employee: [],
  });
};

const getCurrentEmployee = async (req, res) => {
  try {
    const employee = req.employee;
    if (employee) {
      return res.status(201).json({
        success: true,
        message: "Employee fetched successfully",
        employee,
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "Error while getting employee details",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = req.employee;

    const { name, gender, dob } = req.body;
    if (!name || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updateEmployee = await Employee.findByIdAndUpdate(
      employee._id,
      {
        $set: {
          name: name,
          gender: gender,
          dob: dob,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee details updated successfully",
      updateEmployee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting employee",
    });
  }
};

export {
  createEmployee,
  LoginEmployee,
  LogOutEmployee,
  getCurrentEmployee,
  updateEmployee,
  deleteEmployee,
};
