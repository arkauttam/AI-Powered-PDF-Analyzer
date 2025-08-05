import mongoose, { Schema } from "mongoose";

const ResumeSchema = new Schema(
  {
    resumeText: String,
    jobDescription: String,
    score: Number,
    improvements: [String],
    improvedResume: String,
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
