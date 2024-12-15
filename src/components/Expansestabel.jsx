import React from 'react';

const Expansestabel = ({ expanses, deleteExpens }) => {
  return (
    <div>
      <div className="expense-list">
        {expanses &&
          expanses?.map((expanses, index) => (
            <div key={index} className="expense-item">
              <button
                className="delete-button"
                onClick={() => deleteExpens(expanses._id)}
              >
                X
              </button>
              <div className="expense-description">{expanses.text}</div>
              <div
                className="expense-amount"
                style={{ color: expanses.amount > 0 ? "#27ae60" : "#c0392b" }}
              >
                ₹{expanses.amount}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Expansestabel;
