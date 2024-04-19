import { useLocation } from "react-router-dom";
import { useState } from "react";
import Nav from "../../components/Nav/nav";
import { useNavigate} from "react-router-dom";

import "./home.css";

type Task = {
  _id: string;
  taskTitle: string;
  description: string;
  completed: boolean;
  __v: number;
};

const Home = () => {

  // const navigate = useNavigate();

  // const [task, setTask] = useState<Task[]>([]);
  const location = useLocation();
  const user = location.state.data;
  console.log(user);



  return (
    <>
      <Nav username={user.name} />
      
    </>
  );
};

export default Home;
