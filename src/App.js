import React, { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit-card bill", amount: 1200 },
];

function App() {
  // ************************** state values ********************************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);

  // single expense
  const [charge, setCharge] = useState("");

  // single amount
  const [amount, setAmount] = useState("");
  // ************************** functionality ********************************

  //alert
  const [alert, setAlert] = useState({ show: false });
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  const handleSubmit = (e) => {
    console.log(amount, charge);
    e.preventDefault();
    if (charge != "" && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: "success", text: "item added" });
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero `,
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending:{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
