import { useState } from "react";
import { AddTransaction, AddTransactionContainer, RadioBox } from "../../constants/styled";

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  const HandleAddTransaction = () => {
    if (amount == 0 || amount < 0) {
      alert("Please enter a valid number for the amount");
      return;
    }
    if (desc.trim().length === 0) {
      alert("Please enter your description");
      return;
    }
    if (/\d/.test(desc)) {
      alert("Description should not contain numbers");
      return;
    }

    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    props.toggleAddtxn();
    setAmount("");
    setDesc("");
    setType("EXPENSE");

    console.log({ amount: Number(amount), desc, type, id: Date.now() });
  };

  return (
    <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(event) => {
          setDesc(event.target.value);
        }}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={() => setType("EXPENSE")}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={() => setType("INCOME")}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransaction onClick={HandleAddTransaction}>
        Add transaction
      </AddTransaction>
    </AddTransactionContainer>
  );
};

export default AddTransactionView;
