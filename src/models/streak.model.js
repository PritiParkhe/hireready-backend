import mongoose from "mongoose";

const DayActivitySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    problems_count: { type: Number, default: 0 },
  },
  { _id: false },
);

const StreakSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    current_streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    longest_streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    total_active_days: {
      type: Number,
      default: 0,
      min: 0,
    },
    last_active_date: {
      type: Date,
    },
    // Stores daily activity for the calendar view (last 365 days)
    activity: [DayActivitySchema],
  },
  {
    timestamps: true,
  },
);

StreakSchema.index({ user_id: 1 });
StreakSchema.index({ current_streak: -1 }); // For leaderboard

export default model("Streak", StreakSchema);
