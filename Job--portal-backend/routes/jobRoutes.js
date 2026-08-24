const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createJob,
  getAllJobs,
  getJobById,
} = require("../controllers/jobController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "recruiter"]),
  createJob
);
router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;