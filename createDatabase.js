// script to initialise the database with the required workshops
const Workshop = require("./models/workshop");

async function main() {
  const currentWorkshops = await Workshop.find().exec();
  if (currentWorkshops.length === 0) {
    createDatabase();
  }
}

function createDatabase() {
  createWorkshop("Express.js For Beginners", "2024-01-15T13:00");
  createWorkshop("Node.js Package Management", "2024-02-18T15:30");
  createWorkshop("HTTP Verbs In Depth", "2024-02-21T17:45");
  createWorkshop("Effective MongoDB Usage", "2024-04-05T18:15");
}

async function createWorkshop(newTitle, newDatetime) {
  const workshop = new Workshop({
    title: newTitle,
    datetime: newDatetime,
  });

  await workshop.save();
}

module.exports = main;
