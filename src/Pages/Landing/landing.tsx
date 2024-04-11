import Register from "../../components/Auth/register";

import "./landing.css";
const Landing = () => {
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
        <Register />
      </div>
    </div>
  );
};

export default Landing;
