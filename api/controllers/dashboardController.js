const Task = require("../models/taskModel");

const getStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ userId: req.user.id });
    const completedTasks = await Task.countDocuments({
      userId: req.user.id,
      status: "finished",
    });
    const pendingTasks = totalTasks - completedTasks;

    // Calculate time lapsed for pending tasks
    const pendingStats = await Task.aggregate([
      { $match: { userId: req.user.id, status: "pending" } },
      {
        $project: {
          lapsedTime: { $subtract: [new Date(), "$startTime"] },
          balanceTime: { $subtract: ["$endTime", new Date()] },
          priority: 1,
        },
      },
    ]);

    const totalLapsedTime = pendingStats.reduce(
      (acc, task) => acc + task.lapsedTime,
      0
    );
    const totalBalanceTime = pendingStats.reduce(
      (acc, task) => acc + task.balanceTime,
      0
    );

    // Average completion time for completed tasks
    const completedTasksStats = await Task.aggregate([
      { $match: { userId: req.user.id, status: "finished" } },
      {
        $project: {
          completionTime: { $subtract: ["$endTime", "$startTime"] },
        },
      },
    ]);
    const avgCompletionTime =
      completedTasksStats.reduce((acc, task) => acc + task.completionTime, 0) /
      completedTasksStats.length;

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      totalLapsedTime,
      totalBalanceTime,
      avgCompletionTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getStats };
