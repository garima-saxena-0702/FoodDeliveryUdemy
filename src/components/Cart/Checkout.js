import { useRef, useState } from "react/cjs/react.development";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isValid = (value) => value.trim().length === 6;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        city: true,
        street: true,
        postal: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
    event.preventDefault();
    const eneteredName = nameInputRef.current.value;
    const eneteredStreet = streetInputRef.current.value;
    const eneteredPostal = postalInputRef.current.value;
    const eneteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(eneteredName);
    const enteredStreetValid = !isEmpty(eneteredStreet);
    const enteredCityValid = !isEmpty(eneteredCity);
    const enteredPostalCodeValid = isValid(eneteredPostal);

    setFormInputValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      postal: enteredPostalCodeValid,
      city: enteredCityValid,
    });

    const isFormValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredPostalCodeValid &&
      enteredCityValid;

    if (!isFormValid) {
      return;
    }
    props.onConfirm({
        name: eneteredName,
        street: eneteredStreet,
        city: eneteredCity,
        postalCode: eneteredPostal
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please Enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please Enter a valid postal code</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
