import * as Type from "./types";

import axios from "axios";

export const loadTransaction = () => async dispatch => {
  try {
    const res = await axios.get("/api/transaction/");
    dispatch({
      type: Type.LOAD_TRANSACTIONS,
      payload: res.data
    });
  } catch (error) {}
};

export const addTransactions = transaction => async dispatch => {
  try {
    const res = await axios.post("/api/transaction/", transaction);
    dispatch({
      type: Type.CREATE_TRANSACTION,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
