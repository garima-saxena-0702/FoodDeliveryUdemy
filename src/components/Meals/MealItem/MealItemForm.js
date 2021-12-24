import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = props => {
    const [amountIsValid, setAmpuntIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNum = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5) {
            setAmpuntIsValid(false);
            return;
        }
        setAmpuntIsValid(true);
        props.onAddToCart(enteredAmountNum);
    };

    return (
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        {!amountIsValid && <p>Please enter amount between 1-5</p>}
        <button>+ Add</button>
      </form>
    );
}

export default MealItemForm;