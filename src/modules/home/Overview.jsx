
import { useState } from 'react';
import styled from 'styled-components'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
  justify-content: center;
`;
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;
const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;
const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
`;
const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: ${(props) => (props.isAddTxnVisible ? "flex" : "none")};
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AddTransactionView = (props) => {
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('EXPENSE');

    const HandleAddTransaction = () => {
      if (amount == 0 || amount < 0) {
    alert('Please enter a valid number for the amount');
    return;
  }
  if (desc.trim().length === 0) {
    alert('Please enter your description');
    return;
  }
  if (/\d/.test(desc)) {
    alert('Description should not contain numbers');
    return;
  }


        props.addTransaction({ amount:Number(amount), desc, type,id:Date.now()})
        props.toggleAddtxn();
        setAmount('')
        setDesc('')
        setType('EXPENSE')

        console.log({ amount:Number(amount), desc, type,id:Date.now()})
    }

    return (
        <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
            <input type="number" placeholder='Amount' value={amount} onChange={(event) => { setAmount(event.target.value) }} />
            <input type="text" placeholder='Description' value={desc} onChange={(event) => { setDesc(event.target.value) }} />
            <RadioBox>
                <input type="radio" id='expense' name='type' value='EXPENSE' checked={type === 'EXPENSE'} onChange={() => setType('EXPENSE')} />
                <label htmlFor="expense">Expense</label>
                <input type="radio" id='income' name='type' value='INCOME' checked={type === 'INCOME'} onChange={() => setType('INCOME')} />
                <label htmlFor="income">Income</label>
            </RadioBox>
            <AddTransaction onClick={HandleAddTransaction}>Add transaction</AddTransaction>
        </AddTransactionContainer>
    )
}

const Overviewcomponents = (props) => {
    const [isAddTxnVisible, toggleAddtxn] = useState(false);

    return (
        <Container>
            <BalanceBox>Balance: ${props.income - props.expense}
                <AddTransaction onClick={() => toggleAddtxn(!isAddTxnVisible)}>{isAddTxnVisible ? 'CANCEL' : 'ADD'}</AddTransaction>
            </BalanceBox>
            <AddTransactionView isAddTxnVisible={isAddTxnVisible} toggleAddtxn={toggleAddtxn} 
             addTransaction={props.addTransaction}/>
             <ExpenseContainer>
                <ExpenseBox isIncome={false}>Expense<span>${props.expense}</span></ExpenseBox>
                <ExpenseBox isIncome={true}>Income<span>${props.income}</span></ExpenseBox>
             </ExpenseContainer>
        </Container>
    )
}


export default Overviewcomponents