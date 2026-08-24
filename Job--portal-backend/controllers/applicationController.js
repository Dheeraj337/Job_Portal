const Application = require("../models/Application");
const Job = require("../models/Job");

const validStatuses = ["applied", "shortlisted", "rejected"];

/* ================= APPLY FOR JOB ================= */
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "Already applied",
      });
    }

    // Resume upload (optional)
    const resume = req.file ? req.file.path : null;

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });

  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* ================= APPLICANT: MY APPLICATIONS ================= */
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");

    res.status(200).json(applications);

  } catch (error) {
    console.error("Fetch My Applications Error:", error);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};

/* ================= EMPLOYER: JOB APPLICATIONS ================= */
const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check employer ownership
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const applications = await Application.find({
      job: jobId,
    }).populate("applicant", "name email");

    res.status(200).json(applications);

  } catch (error) {
    console.error("Fetch Job Applications Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* ================= EMPLOYER: UPDATE APPLICATION STATUS ================= */
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be one of: applied, shortlisted, rejected",
      });
    }

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Check employer ownership
    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application,
    });

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
};
