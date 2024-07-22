import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable, readReservation } from "../utils/api";

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
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  // Handle the change event for table selection
  const changeHandler = (event) => {
    setTableId(event.target.value);
  };

  // Handle the form submission for seating the reservation
  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    await updateTable(reservation.reservation_id, tableId);
    history.push("/dashboard"); // Navigate to the dashboard after updating the table
  };

  return (
    <section>
      <h2>Seat Reservation</h2>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <select
              id="table_id"
              name="table_id"
              value={tableId}
              required={true}
              onChange={changeHandler}
            >
              <option value="">- Select a table -</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={
                    table.capacity < reservation.people || table.occupied
                  }
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className="group-row">
            <button
              className="black"
              type="button"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button className="yellow" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ReservationSeat;