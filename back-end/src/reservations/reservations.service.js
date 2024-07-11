const knex = require("../db/connection.js");

function list(reservation_date) {
  const query = knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
  
  if (reservation_date) {
    query.where({ reservation_date });
  }
  
  return query;
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedRes) {
  console.log("updatedRes", updatedRes);
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedRes.reservation_id })
    .update(updatedRes)
    .returning("*")
    .then((updatedRecords) => updatedRecords[0]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status: status })
    .returning("*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  list,
  search,
  read,
  update,
  create,
  updateStatus,
};
