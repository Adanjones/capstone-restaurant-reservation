const reservations = require("./00-reservations.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(reservations))
    .catch(err => {
      console.error("Error seeding data:", err);
      process.exit(1);
    });
};
