const Task = require("../models/taskModel");

// Create a new task
const createTask = async (req, res) => {
  const { title, startTime, endTime, priority, status } = req.body;

  console.log(req.user);

  try {
    const task = new Task({
      userId: req.user.id,
      title,
      startTime,
      endTime,
      priority,
      status,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, getTasks };
