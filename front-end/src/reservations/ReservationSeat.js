import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTables, readReservations } from "../utils/api";

export const ReservationSeat = () => {
  const { reservation_id } = useParams(); // Get reservation_id from URL parameters
  const [tables, setTables] = useState([]); // State to store the list of tables
  const [tableId, setTableId] = useState(""); // State to store selected table ID
  const [reservation, setReservation] = useState({}); // State to store reservation details
  const history = useHistory(); // Hook to manage navigation

  // Fetch the list of tables when the component mounts
  useEffect(() => {
    listTables().then(setTables);
  }, []);

  // Fetch the reservation details when reservation_id changes
  useEffect(() => {
    readReservations(reservation_id).then(setReservation);
  }, [reservation_id]);

  // Handle the change event for table selection
  const changeHandler = (event) => {
    setTableId(event.target.value);
  };

  // Handle the form submission for seating the reservation
  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    await updateTables(reservation.reservation_id, tableId);
    history.push("/dashboard"); // Navigate to the dashboard after updating the table
  };

  // Add your JSX code here to render the form and tables selection
};
