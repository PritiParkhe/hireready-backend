import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const required = ["MONGODB_URI", "DB_NAME"];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
  },
};
