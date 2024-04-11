import { useLocation } from "react-router-dom";

import Nav from "../../components/Nav/nav";

import "./home.css";


const Home = () => {
  const location = useLocation();
  const user = location.state.data;

  return (<> 
  <Nav username={user.name} />
  HELLO I AM HOME 

  <p> This is you email :  {user.username} </p>
  </>);
}

export default Home;