import styled from "styled-components";
import Overviewcomponents from "./Overview";
import Transactioncomponents from "./Transaction";
import { useEffect, useState } from "react";
import { Container } from "../../constants/styled";


const Homecomponents = (props) => {
  const [transactions, setTransaction] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    setTransaction(transactionArray);
  };
  const deleteTransaction = (id) => {
    const setdTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransaction(setdTransactions);
  };

  const updateTransaction = (editingTransaction) => {
    const index = transactions.findIndex(
      (transaction) => transaction.id === editingTransaction.id
    );

    if (index === -1) {
      return;
    }

    const updatedTransactions = [...transactions];

    updatedTransactions[index] = editingTransaction;
    setTransaction(updatedTransactions);
  };

  

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) => {
      if (payload.type === "EXPENSE") {
        exp += Number(payload.amount);
      } else {
        inc += Number(payload.amount);
      }
    });
    setExpense(exp);
    setIncome(inc);
  };
  useEffect(() => calculateBalance(), [transactions]);
  return (
    <Container>
      <Overviewcomponents
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <Transactioncomponents
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        updateTransaction={updateTransaction}
      />
    </Container>
  );
};

export default Homecomponents;
