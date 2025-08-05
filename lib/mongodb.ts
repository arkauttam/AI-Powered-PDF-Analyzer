import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("MONGODB_URI", MONGODB_URI);
let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "resumeAnalyzer",
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
