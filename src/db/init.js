const Database = require("./config");

const initDb = {

  async init() {

    const db = await Database();

    await db.exec(`
            CREATE TABLE Profile 
            (
                 id                 INTEGER PRIMARY KEY
                ,name               TEXT NOT NULL
                ,avatar             TEXT NOT NULL
                ,monthly_budget     INT  NOT NULL
                ,days_per_week      INT  NOT NULL
                ,hours_per_day      INT  NOT NULL
                ,vacation_per_year  INT  NOT NULL
                ,value_hour         INT  NOT NULL
            )

        `);

    await db.exec(`
            CREATE TABLE Jobs 
            (
                 id          INTEGER PRIMARY KEY
                ,name        TEXT     NOT NULL
                ,daily_hours INT      NOT NULL
                ,total_hours INT      NOT NULL
                ,created_at  DATETIME NOT NULL
            )

        `);

    await db.run(`
            INSERT INTO Profile 
            (
                 name
                ,avatar
                ,monthly_budget
                ,days_per_week
                ,hours_per_day
                ,vacation_per_year
                ,value_hour
            )
            VALUES
            (
                "Gian Milani"
                ,"https://avatars.githubusercontent.com/u/69317995?v=4"
                ,4000
                ,5
                ,8
                ,4
                ,25
            )
        `);

    await db.run(`
            INSERT INTO Jobs 
            (
                 name
                ,daily_hours
                ,total_hours
                ,created_at
            )
            VALUES
            (
                "Pizzaria Guloso"
                ,4
                ,40
                ,"2021-11-29"
            )
        `);

    await db.close();
  },
};

initDb.init();

/*
(
    "One Two Project
    ,2
    ,20
    ,GetDate()
);
*/
