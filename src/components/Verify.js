import { useEffect, useRef, useState } from "react";
import classes from "./Verify.module.css";
let currentOTP = 0;
const Verify = () => {
  const inputRef = useRef();
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [activeOtp, setActiveOtp] = useState(0);
  const [isError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const changeHandler = (e) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[currentOTP] = value.substring(value.length - 1);
    if (!value) {
      setActiveOtp(currentOTP - 1);
    } else {
      setActiveOtp(currentOTP + 1);
    }
    setOtp(newOtp);
  };
  const handleKeyDown = ({ key }, index) => {
    currentOTP = index;
    if (key === "Backspace") {
      setActiveOtp(currentOTP - 1);
    }
  };
  const proceedButton = async (e) => {
    e.preventDefault();
    console.log();
    const payload = otp.join("").toUpperCase();
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://falconlite.com/v1/api/verify-email",
        {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to verified");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error("Failed to verified");
      }
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  });
  return (
    <>
      <div className={classes.header}>
        <h4>Kindly enter Email Verification Code </h4>
        <p>
          To Sign up, kindly enter the verification code sent to your email
          address
        </p>
      </div>
      <p className="error">{isError}</p>
      <div className={classes.verify} onSubmit={proceedButton}>
        <form className={classes.form}>
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              onChange={changeHandler}
              value={otp[index]}
              ref={index === activeOtp ? inputRef : null}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
          <button type="submit">
            Proceed{isLoading ? <p className="spinner"></p> : null}
          </button>
        </form>
      </div>
    </>
  );
};
export default Verify;
