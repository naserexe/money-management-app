import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addTransactions } from "../../store/actions/transactionAction";

const AddTransaction = props => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [note, setNote] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    let newTrans = {
      amount,
      type,
      note
    };

    props.addTransactions(newTrans);
    setAmount(0);
    setNote("");
    setType("");
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  return (
    <Modal
      style={customStyles}
      isOpen={props.isOpen}
      onRequestClose={props.close}
    >
      <h2 className='text-center'>Add new Transactions</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='number'
            className='form-control'
            placeholder='Enter amount'
            name='amount'
            id='amount'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <select
            className='form-control'
            onChange={e => setType(e.target.value)}
          >
            <option>Select type</option>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
          </select>
        </div>

        <div className='form-group'>
          <textarea
            className='form-control'
            placeholder='Enter note'
            name='note'
            id='note'
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>
      </form>

      <button className='btn btn-primary mr-3' onClick={onSubmit}>
        Add
      </button>
      <button onClick={props.close} className='btn btn-danger'>
        Close
      </button>
    </Modal>
  );
};

export default connect(
  null,
  { addTransactions }
)(AddTransaction);
