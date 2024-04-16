import { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionCell from "./TransactionCell";
import { TransactionContainer } from "../../constants/styled";


const Transactioncomponents = ({
  transactions,
  deleteTransaction,
  updateTransaction,
}) => {
  const [filteredTransaction, updateTxn] = useState(transactions);
  const [searchText, updateSearchText] = useState("");

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

  return (
    <TransactionContainer>
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
      {filteredTransaction?.length
        ? filteredTransaction.map((payload) => (
            <TransactionCell
              updateTransaction={updateTransaction}
              key={payload.id}
              payload={payload}
              deleteTransaction={deleteTransaction}
            />
          ))
        : ""}
    </TransactionContainer>
  );
};

export default Transactioncomponents;
