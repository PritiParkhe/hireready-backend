import { Tracker } from "../../models/tracker.model.js";

// POST /log-problem
export const logProblem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      problem_name, // required
      difficulty, // required
      topic, // required
      platform,
      status,
      time_taken_min,
      notes,
      needs_revision,
      companies,
      problem_url,
    } = req.body;

    // validate required fields
    if (!problem_name || !difficulty || !topic) {
      return res.status(400).json({
        message: "Please provide problem name, difficulty and topic",
      });
    }

    const entry = await Tracker.create({
      userId: userId,
      problem_name,
      difficulty,
      topic,
      platform,
      status,
      time_taken_min,
      notes,
      needs_revision,
      companies,
      problem_url,
    });
    
    return res.status(201).json({
      success: true,
      message: "Problem logged successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Error Logging Problem", error);
    return res.status(500).json({
      success: false,
      message: "Issue in logging problem",
    });
  }
};

// GET /tracker/:id
export const getProblem = async (req, res) => {
  try {
    //step 1: get user id from req.user
    const userId = req.user.userId;
    const problemId = req.params.id;
    

    // step 2: fetch a problem for the user
    const problem = await Tracker.findOne({ _id: problemId, user_id: userId });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    console.error("Error fetching problem", error);
    return res.status(500).json({
      success: false,
      message: "Issue in fetching problem",
    });
  }
};
