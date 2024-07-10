const knex = require("../db/connection.js");

function list (reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_numer, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(resecation) {
  return knex("reservations")
    .insert(reservaiton)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedRes) {
  console.log("updatedRes", updatedRes);
  return knex("reservations")
    .select("*")
      .where({ resevation_id: updatedRes.resevation_id })
      .update(updateRes, "*")
      .then((createdRecords) => createdRecords[0]);
}

function updateStatus (resevation_id, status) {
  return knex ("resevations")
    .select("*")
    .where({ reservation_id })
    .update({ status: status }, "*")
    .then((createRecords) => createdRecords[0]);
}

module.exports = {
  list,
  search,
  read,
  update,
  create,
  updateStatus,
};