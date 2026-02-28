import mongoose from "mongoose";

const TrackerSchema = new mongoose.Schema(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    problem_name: {
      type: String,
      required: [true, "Problem name is required"],
      trim: true,
    },
    platform: {
      type: String,
      enum: {
        values: ["leetcode", "gfg", "codeforces", "hackerrank", "other"],
        message: "{VALUE} is not a valid platform",
      },
      default: "leetcode",
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "{VALUE} is not a valid difficulty level",
      },
      required: [true, "Difficulty level is required"],
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["unsolved", "attempted", "solved", "revisit"],
      default: "unsolved",
    },
    time_taken_min: {
      type: Number,
      min: [1, "Time taken must be at least 1 minute"],
      max: [300, "Time taken cannot exceed 300 minutes"],
    },
    notes: { type: String, maxlength: 1000 },
    needs_revision: { type: Boolean, default: false },
    companies: [{ type: String, trim: true }],
    solved_at: { type: Date, default: Date.now },
    revision_count: { type: Number, default: 0, min: 0 },
    last_revised_at: { type: Date },
    problem_url: { type: String },
  },
  { timestamps: true },
);

// Indexes for fast queries
TrackerSchema.index({ user_id: 1, topic: 1 });
TrackerSchema.index({ user_id: 1, solved_at: -1 });
TrackerSchema.index({ user_id: 1, needs_revision: 1 });
TrackerSchema.index({ user_id: 1, difficulty: 1 });
TrackerSchema.index({ user_id: 1, companies: 1 });

export const Tracker = mongoose.model("Tracker", TrackerSchema);
