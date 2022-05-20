const applicationStatus = {
  new: "NEW",
  inProgress: "IN_PROGRESS",
  hired: "HIRED",
  unsuitable: "UNSUITABLE",
};

const candidateStatus = {
  looking: { db: "I_AM_LOOKING_FOR_JOB", client: "Looking for a job" },
  open: { db: "OPEN_FOR_OPPORTUNITIES", client: "Open for opportunities" },
  notInterested: { db: "I_AM_NOT_INTERESTED_IN_JOB", client: "Not interested in job" },
};

export { applicationStatus, candidateStatus };
