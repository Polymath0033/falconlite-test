import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import classes from "./Register.module.css";
import eyeOpen from "../assets/eye-solid.svg";
import eyeClosed from "../assets/eye-slash-solid.svg";
const isNotEmpty = (val) => val.trim() !== "";
const isEmail = (email) => email.includes("@");
const Register = () => {
  const [type, setType] = useState("password");
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isNotEmpty);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);
  let formIsValid = false;
  if (firstNameIsValid && emailIsValid && phoneIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const changeType = () => {
    setType(type === "password" ? "text" : "password");
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log({
      name: firstNameValue,
      email: emailValue,
      phone: phoneValue,
      password: passwordValue,
    });
    try {
      setISLoading(true);
      const response = await fetch("https://falconlite.com/v1/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          name: firstNameValue,
          email: emailValue,
          phone: phoneValue,
          password: passwordValue,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to authenticate");
      }
      const data = await response.json();
      if (!data.success) {
        return;
      }
      navigate("/verify-email");
      setISLoading(false);
    } catch (e) {
      setError(e.message);
      setISLoading(false);
    }

    resetFirstName();
    resetEmail();
    resetPhone();
    resetPassword();
  };

  return (
    <>
      <div className={classes.header}>
        <h4>Create an account</h4>
        <p>Register on our website with your email and password</p>
      </div>
      <p className="error">{error}</p>
      <form onSubmit={submitFormHandler}>
        <div
          className={`${classes["form-control"]} ${
            firstNameHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="first-name">first Name</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Jeremiah"
            required
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
        </div>
        <div
          className={`${classes["form-control"]} ${
            emailHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Frame@gmail.com"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <div
          className={`${classes["form-control"]} ${
            phoneHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="number"
            name="phone-number"
            id="phone-number"
            required
            placeholder="+2348103769079"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
        </div>
        <div
          className={`${classes["form-control"]} ${
            passwordHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <div className={classes.password}>
            <input
              type={type}
              name="password"
              id="password"
              required
              placeholder="*********"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <img
              src={type === "password" ? eyeOpen : eyeClosed}
              onClick={changeType}
              alt="eye"
            />
          </div>
        </div>
        <div className={classes.remember}>
          <input type="checkbox" name="remember-me" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className={classes.last}>
          <button className={classes.button} type="submit">
            Sign up {isLoading ? <p className="spinner"></p> : null}
          </button>
          <p className={classes.paragraph}>
            Already have an account <a href="https.google.com">Sign in</a>
          </p>
        </div>
      </form>
    </>
  );
};
export default Register;
