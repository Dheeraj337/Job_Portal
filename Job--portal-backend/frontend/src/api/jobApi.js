import api from "./axios";

export const createJob = (jobData) => {
  return api.post("/jobs", jobData);
};

export const getAllJobs = () => {
  return api.get("/jobs");
};
export const getAllApplicationsAdmin = () => {
  return api.get("/applications/admin");
};


export const applyForJob = (jobId, formData) => {
  return api.post(`/applications/${jobId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
