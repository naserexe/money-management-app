import * as Type from "../actions/types";

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case Type.LOAD_TRANSACTIONS:
      return action.payload;

    case Type.CREATE_TRANSACTION:
      let transactions = [...state];
      transactions.unshift(action.payload);
      return transactions;

    default:
      return state;
  }
};

export default transactionReducer;
