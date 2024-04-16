
import styled from "styled-components";
import EditComponent from "./EditComponent";
import { useState } from "react";
import { ActionButtons, Cell, DeleteButton, EditButton } from "../../constants/styled";



const TransactionCell = ({ payload, deleteTransaction, updateTransaction }) => {
  const handleDelete = () => {
    deleteTransaction(payload.id);
  };

  const [enableEditing, setEnableEditng] = useState(false);
  const handleEdit = () => {
    setEnableEditng(true);
  };

  return (
    <Cell isExpense={payload?.type === "EXPENSE"}>
      {!enableEditing && (
        <>
          <span>{payload.desc}</span>
          <span>{payload.amount}</span>
          <ActionButtons>
            <EditButton onClick={handleEdit}>✏️</EditButton>
            <DeleteButton onClick={handleDelete}>🗑️</DeleteButton>
          </ActionButtons>
        </>
      )}
      {enableEditing && (
        <EditComponent
          payload={payload}
          setEnableEditng={setEnableEditng}
          updateTransaction={updateTransaction}
        />
      )}
    </Cell>
  );
};

export default TransactionCell