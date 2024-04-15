
import { useEffect, useState } from 'react';
import styled from 'styled-components'
const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;
const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
   position: relative;
  transition: background-color 0.3s;

   &:hover {
    background-color: #f0f0f0;
    span.amount {
      transform: translateX(20px);
    }
  }
`;
const ActionButtons = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  ${Cell}:hover & {
    display: flex;
  }
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Amount = styled.span`
  transition: transform 0.3s;
`;


const EditTransactionContainer = styled.div`
   font-size: 15px;
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 95%;
  align-items: center;
  padding: 15px 10px;
  gap: 10px;

  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

const RadioContainer = styled.div`
 display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
`;


const EditTransactionInput = styled.input`
  width: 90%;
  outline: none;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
`;

const TransactionCell = ({ payload, deleteTransaction, editTransaction }) => {
  const handleDelete = () => {
    deleteTransaction(payload.id);
  };

  const handleEdit = () => {
    editTransaction(payload);
  };

  return (
    <Cell isExpense={payload?.type === 'EXPENSE'}>
      <span>{payload.desc}</span>
      <span>{payload.amount}</span>
      <ActionButtons>
        <EditButton onClick={handleEdit}>✏️</EditButton>
        <DeleteButton onClick={handleDelete}>❌</DeleteButton>
      </ActionButtons>
    </Cell>
  );
};
const Transactioncomponents = ({ transactions, deleteTransaction }) => {
  const [filteredTransaction, updateTxn] = useState(transactions);
  const [searchText, updateSearchText] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filterData = () => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(transactions);
      return;
    }
    let txn = [...transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => filterData(searchText), [transactions, searchText]);

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const updateTransaction = () => {
    const index = transactions.findIndex(
      (transaction) => transaction.id === editingTransaction.id
    );

    if (index === -1) {
      return;
    }

    const updatedTransactions = [...transactions];

    updatedTransactions[index] = editingTransaction;
    updateTxn(updatedTransactions);
    setEditingTransaction(null);
  };

  return (
    <Container>
      Transaction
      <input
        type="search"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.length ? (
        filteredTransaction.map((payload) => (
          <TransactionCell
            key={payload.id}
            payload={payload}
            deleteTransaction={deleteTransaction}
            editTransaction={editTransaction}
          />
        ))
      ) : (
        ''
      )}
      {}

{editingTransaction && (
  <EditTransactionContainer>
    <input
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
      <RadioInput
        type="radio"
        id="expense"
        name="type"
        value="EXPENSE"
        checked={editingTransaction.type === 'EXPENSE'}
        onChange={() =>
          setEditingTransaction({
            ...editingTransaction,
            type: 'EXPENSE',
          })
        }
      />
      <RadioLabel htmlFor="expense">Expense</RadioLabel>
      <RadioInput
        type="radio"
        id="income"
        name="type"
        value="INCOME"
        checked={editingTransaction.type === 'INCOME'}
        onChange={() =>
          setEditingTransaction({
            ...editingTransaction,
            type: 'INCOME',
          })
        }
      />
      <RadioLabel htmlFor="income">Income</RadioLabel>
    </RadioContainer>
    <ButtonGroup>
    <StyledButton onClick={updateTransaction}>Update</StyledButton>
    <StyledButton onClick={() => setEditingTransaction(null)}>Cancel</StyledButton>
  </ButtonGroup>
  </EditTransactionContainer>
)}

    </Container>
  );
};

export default Transactioncomponents