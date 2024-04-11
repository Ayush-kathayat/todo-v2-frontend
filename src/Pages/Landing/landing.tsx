import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import Register from "../../components/Auth/register";
import Login from "../../components/Auth/login";

import "./landing.css";
const Landing = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleLoginClick = () => {
    setIsLoginForm(true);
  };

  const handleRegisterClick = () => {
    setIsLoginForm(false);
  };

  return (
    <div className="landing-wrapper">
      <div className="land-left">
        <img src="landing.svg" alt="people sweet people" />
      </div>

      <div className="land-right">
        <div className="app-info">
          {" "}
          <h1 className="app-title">TaskFlow</h1>
          <p className="app-desc">
            Elevate Your Productivity with Our Dynamic Todo App{" "}
          </p>{" "}
        </div>
        {/* <CSSTransition
          in={isLoginForm}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Login />
        </CSSTransition>
        <CSSTransition
          in={!isLoginForm}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Register />
        </CSSTransition> */}
        {isLoginForm ? <Login /> : <Register />}
        <div className="login-register">
          {isLoginForm ? (
            <p className="switch-form-link" onClick={handleRegisterClick}>
              Don't have an account?
            </p>
          ) : (
            <p className="switch-form-link" onClick={handleLoginClick}>
              Already have an account?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;