
import styled from 'styled-components'
import Overviewcomponents from './Overview';
import Transactioncomponents from './Transaction';
import { useEffect, useState } from 'react';


const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const Homecomponents = (props)=>{
    const [transactions,updateTransaction] = useState([])
    const [expense,updateExpense] = useState(0)
    const [income,updateIncome] = useState(0)

    const addTransaction = (payload)=>{
    const transactionArray = [...transactions]
    transactionArray.push(payload)
    console.log(transactionArray)
    updateTransaction(transactionArray)
    
  }
  const deleteTransaction = (id) => {
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      updateTransaction(updatedTransactions);
    };

  const calculateBalance=()=>{
    let exp = 0
    let inc = 0 
    transactions.map((payload)=>{
      if (payload.type === 'EXPENSE') {
            exp += payload.amount;
        } else {
            inc += payload.amount; 
        }
    })
   updateExpense(exp)
   updateIncome(inc)
  }
   useEffect(()=>calculateBalance(),[transactions])
    return(
    <Container>
     <Overviewcomponents addTransaction={addTransaction} expense={expense} income={income} />
    <Transactioncomponents transactions={transactions} deleteTransaction={deleteTransaction}/>
        </Container>
    )

}

export default Homecomponents