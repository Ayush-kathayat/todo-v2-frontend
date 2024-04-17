import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


type LoginFormContextType = {
  isLoginForm: boolean;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
};


export const LoginFormContext = React.createContext<LoginFormContextType>({
  isLoginForm: false,
  setIsLoginForm: () => {}, // This is just a placeholder
});
import "./App.css";

import Landing from "./Pages/Landing/landing";
import Home from "./Pages/Home/home";

function App() {
  const [isLoginForm, setIsLoginForm] = useState(false);

  return (
    <LoginFormContext.Provider value={{ isLoginForm, setIsLoginForm }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </LoginFormContext.Provider>
  );
}

export default App;
