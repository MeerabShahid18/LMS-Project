import mongoose, { set } from "mongoose";
require("dotenv").config();
const dbUrl: String = process.env.DB_URI || "";
const dbConnection = async () => {
  try {
    await mongoose.connect(`${dbUrl}`).then((data: any) => {
      console.log(`MongoDB connected successfully: ${data.connection.host}`);
    });
  } catch (error:any) {
    console.error("Error", error.message);
    setTimeout(dbConnection, 5000);
  }
};
export default dbConnection;