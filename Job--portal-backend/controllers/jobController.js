const Job = require("../models/Job");

const validJobTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];

// ================= CREATE JOB =================
// Admin / Employer
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, company, jobType } = req.body;

    if (!title || !description || !location || !company || !jobType) {
      return res.status(400).json({ message: "Title, description, location, company, and job type are required" });
    }

    if (salary === undefined || salary === null || Number(salary) <= 0) {
      return res.status(400).json({ message: "Salary must be a valid positive number" });
    }

    if (!validJobTypes.includes(jobType)) {
      return res.status(400).json({ message: "Invalid job type" });
    }

    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      salary: Number(salary),
      company: company.trim(),
      jobType,
      createdBy: req.user._id,
    });

    return res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    return res.status(500).json({ message: "Failed to create job" });
  }
};

// ================= GET ALL JOBS =================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email role");
    return res.json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// ================= GET JOB BY ID =================
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json(job);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch job" });
  }
};

// ================= DELETE JOB =================
// Admin / Employer
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();
    return res.json({ message: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
};
