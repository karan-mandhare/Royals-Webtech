import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to the Databse", connect.connection.host);
  } catch (err) {
    res.json({
      success: false,
      message: "Error while connecting database",
      err,
    });
  }
};

export { connectDB };
