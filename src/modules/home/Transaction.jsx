
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
  }
`;
const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;

  ${Cell}:hover & {
    opacity: 1;
  }
`;

const TransactionCell = (props)=>{
  const handleDelete = () => {
   props.deleteTransaction(props.payload.id);
    console.log("Delete transaction:", props.payload.id);
  };
  return(
    <Cell isExpense={props.payload?.type === 'EXPENSE'}>
      <span>{props.payload.desc}</span>
      <span>{props.payload.amount}</span>
      <DeleteButton onClick={handleDelete}>❌</DeleteButton>
    </Cell>
  )
}
const Transactioncomponents = (props)=>{
  const [filteredTransaction,updatetxn] = useState(props.transactions)
  const [searchText,updateSearchText] = useState('')
  const filterData = () =>{
    if(!searchText || !searchText.trim().length){
      updatetxn(props.transactions)
      return
    }
    let txn = [...props.transactions]
    txn = txn.filter((payload)=>payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
    updatetxn(txn)

  }
  useEffect(()=> filterData(searchText),[props.transactions,searchText])
    return(
        <Container>
            Transaction
            <input type="Search" placeholder='Search' value={searchText}
             onChange={(e)=>
             {updateSearchText(e.target.value)
              filterData(e.target.value)
             }}/>
            {filteredTransaction ?.length 
            ? filteredTransaction.map((payload)=>(
            <TransactionCell key={payload.id} 
              payload={payload} 
              deleteTransaction={props.deleteTransaction} 
            />
            ))
            : ''}
        </Container>
    )

}

export default Transactioncomponents