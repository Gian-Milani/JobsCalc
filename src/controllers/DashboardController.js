const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      total: jobs.length,
      progress: 0,
      done: 0,
    };

    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //Somando + 1 na posicao do status
      statusCount[status] += 1;

      // calculo para horas livres no dia (job em progress)
      jobTotalHours = status === "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
