import { useState } from "react";
import styled from "styled-components";
import AddTransactionView from "./AddTransactionView";
import {
  AddTransactionFromOverview,
  BalanceBox,
  ExpenseBox,
  ExpenseContainer,
  OverViewContainer,
} from "../../constants/styled";

const Overviewcomponents = (props) => {
  const [isAddTxnVisible, toggleAddtxn] = useState(false);

  return (
    <OverViewContainer>
      <BalanceBox>
        Balance: ${props.income - props.expense}
        <AddTransactionFromOverview
          onClick={() => toggleAddtxn(!isAddTxnVisible)}
        >
          {isAddTxnVisible ? "CANCEL" : "ADD"}
        </AddTransactionFromOverview>
      </BalanceBox>
      <AddTransactionView
        isAddTxnVisible={isAddTxnVisible}
        toggleAddtxn={toggleAddtxn}
        addTransaction={props.addTransaction}
      />
      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expense<span>${props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span>${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </OverViewContainer>
  );
};

export default Overviewcomponents;
