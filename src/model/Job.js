const jobUtils = require("../utils/JobUtils");
const Database = require('../db/config');

module.exports = {
  async get() {

    const db = await Database()

    const jobs = await db.all(`Select * From Jobs`)

    await db.close()

    return jobs.map(job => ({

        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at

      }));
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    await db.run(`
      Update Jobs
        Set name = '${updatedJob.name}'
           ,daily_hours = ${updatedJob["daily-hours"]}
           ,total_hours = ${updatedJob["total-hours"]}
        Where id = ${jobId}
    `)

    await db.close()
  },

  async delete(id) {
    const db = await Database()

    await db.run(`Delete From Jobs Where id = ${id}`)

    await db.close()
  },

  async create(newJob) {
    const db = await Database()

    // Select para pegar o próximo id, problemas com o autoincrement do sqlite
    const data = await db.get("Select IFNULL(MAX(Id), 0) + 1 As id From Jobs")

    await db.run(`
      Insert Into Jobs 
        (
          id,
          name,
          daily_hours,
          total_hours,
          created_at
        )
        Values
        (
          ${data.id},
          '${newJob.name}',
          ${newJob["daily-hours"]},
          ${newJob["total-hours"]},
          ${newJob.created_at}
        ) 
      
    `)

    await db.close()
  },
};
