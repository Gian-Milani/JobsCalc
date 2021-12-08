module.exports = {
  remainingDays(job) {
    //calculo de tempo restante
    const reaminingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(reaminingDays);
    const dueDate = createdDate.setDate(dueDay);

    const timeDiff = dueDate - Date.now();

    //tranformando milisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.ceil(timeDiff / dayInMs);

    //dias restantes
    return dayDiff;
  },

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
};
