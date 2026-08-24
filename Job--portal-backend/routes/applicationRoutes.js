const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

/* JOBSEEKER APPLY */
router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware(["jobseeker"]),
  uploadMiddleware.single("resume"),
  applyForJob
);

/* JOBSEEKER MY APPLICATIONS */
router.get(
  "/my",
  authMiddleware,
  roleMiddleware(["jobseeker"]),
  getMyApplications
);

/* RECRUITER JOB APPLICATIONS */
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  getApplicationsForJob
);

/* RECRUITER UPDATE STATUS */
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  updateApplicationStatus
);

module.exports = router;