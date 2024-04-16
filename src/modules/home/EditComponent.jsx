import { useState } from "react";
import styled from "styled-components";
import { ButtonGroup, EditTransactionContainer, EditTransactionInput, RadioContainer, StyledButton } from "../../constants/styled";

const EditComponent = ({ payload, updateTransaction, setEnableEditng }) => {
  const [editingTransaction, setEditingTransaction] = useState(payload);

  return (
    <EditTransactionContainer>
      <EditTransactionInput
        type="text"
        value={editingTransaction.desc}
        onChange={(e) =>
          setEditingTransaction({
            ...editingTransaction,
            desc: e.target.value,
          })
        }
      />
      <EditTransactionInput
        type="number"
        value={editingTransaction.amount}
        onChange={(e) =>
          setEditingTransaction({
            ...editingTransaction,
            amount: e.target.value,
          })
        }
      />
      <RadioContainer>
        <RadioContainer>
          <input
            type="radio"
            id="expense"
            name="type"
            value="EXPENSE"
            checked={editingTransaction.type === "EXPENSE"}
            onChange={() =>
              setEditingTransaction({
                ...editingTransaction,
                type: "EXPENSE",
              })
            }
          />
          <label htmlFor="expense">Expense</label>
        </RadioContainer>
        <RadioContainer>
          <input
            type="radio"
            id="income"
            name="type"
            value="INCOME"
            checked={editingTransaction.type === "INCOME"}
            onChange={() =>
              setEditingTransaction({
                ...editingTransaction,
                type: "INCOME",
              })
            }
          />
          <label htmlFor="income">Income</label>
        </RadioContainer>
      </RadioContainer>
      <ButtonGroup>
        <StyledButton
          onClick={() => {
            updateTransaction(editingTransaction);
            setEnableEditng(false);
          }}
        >
          Update
        </StyledButton>
        <StyledButton onClick={() => setEnableEditng(false)}>
          Cancel
        </StyledButton>
      </ButtonGroup>
    </EditTransactionContainer>
  );
};

export default EditComponent;
