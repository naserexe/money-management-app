import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTransaction } from "../../store/actions/transactionAction";
import AddTransaction from "../transactions/AddTransaction";

const Dashboard = props => {
  let { name, email } = props.user;
  let { transactions } = props;

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    props.loadTransaction();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-8 offset-md-2'>
        <h1>Welcome {name}</h1>
        <p>Email {email}</p>
        <button className='btn btn-success' onClick={openModal}>
          Add new transaction
        </button>
        <AddTransaction isOpen={isOpen} close={closeModal} />
        <br />
        <h1>Transactions: </h1>
        <ul className='list-group'>
          {transactions.map(transaction => (
            <li className='list-group-item' key={transaction._id}>
              <p
                className={
                  transaction.type === "income"
                    ? "text-success"
                    : "text-warning"
                }
              >
                Type: {transaction.type}
              </p>
              <p>Amount: {transaction.amount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  transactions: state.transactions
});

export default connect(
  mapStateToProps,
  { loadTransaction }
)(Dashboard);
