import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableErrors from "./TableErrors";

export const TableNew = () => {
  const initialTableState = {
    table_name: "",
    capacity: 0,
  };

  const [table, setTable] = useState({
    ...initialTableState,
  });
  const [tableErrors, setTableErrors] = useState(null);
  const history = useHistory();

  const changeHandler = (event) => {
    if (event.target.name === "capacity") {
      setTable({
        ...table,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setTable({
        ...table,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    createTable(table, abortController.signal)
      .then(history.push(`/dashboard`))
      .catch(setTableErrors);

    return () => abortController.abort();
  };
};

export default TableNew;