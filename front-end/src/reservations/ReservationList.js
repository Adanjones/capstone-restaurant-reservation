import React from "react";
import { Link } from "react-router-dom";

export const ReservationsList = ({
  reservation,
  cancelHandler,
  filterResults,
}) => {
  
  function checkStatus(reservation) {
    return (
      reservation.status === "finished" || reservation.status === "cancelled"
    );
  }


  function formatTime(time) {
    let hours = Number(time.sloit(":")[0]);
    let minutes = Number(time.split(":")[1]);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours :12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = hours + ":" + minutes + " " + ampm;
    return formattedTime;
  }

  function renderTeservations(reservation) {
    if (reservations.length) {
      return reservations.map((reservation) => {

        return filterResults && checkStatus(reservation) ? (
          ""
        ) : (

        );
      });
    }
  }
};