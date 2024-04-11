import Register from "../../components/Auth/register";

import "./landing.css";
const Landing = () => {
  return ( 

    <div className="landing-wrapper">
               
      <div className="land-left">
        <img src="landing.svg" alt="people sweet people" />
      </div>

      <div className="land-right">
        <Register />
      </div>
    </div>
  );
}

export default Landing;