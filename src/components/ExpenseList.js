import React from "react";
import ExpenseItem from "./ExpenseItem";


const ExpenseList = ({expenses}) => {
  return (
    <>
      <ul>
        {expenses.map((expense) => {
          return <ExpenseItem key={expense.id} expense={expense}/>
        })}
      </ul>

      {expenses.length > 0 && <button className='btn'>Clear Expenses</button>}
    </>
  )

};

export default ExpenseList;
