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

  const navigate = useNavigate();

  const [task, setTask] = useState<Task[]>([]);
  const location = useLocation();
  const user = location.state.data;
  console.log(user);



  return (
    <>
      <Nav username={user.name} />
      HELLO I AM HOME
      <p> This is you email : {user.username} </p>
      <button onClick={handleCreateTask}>CLICK TO CREATE A DUMMY TASK</button>
      <button onClick={handleShowTask}> click to get all the task </button>
      {task.map((item: Task) => {
        return (
          <div key={item._id}>
            <h2>{item.taskTitle}</h2>
            <p>{item.description}</p>
          </div>
        );
      })}

     <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Home;
