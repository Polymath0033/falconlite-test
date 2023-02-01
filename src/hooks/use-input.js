import { useState } from "react";

const useInput = (validateInput) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const valueIsValid = validateInput(value);
  const hasError = !valueIsValid && touched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = (event) => {
    setTouched(true);
  };

  const reset = () => {
    setValue("");
    setTouched(false);
  };

  return {
    value: value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
