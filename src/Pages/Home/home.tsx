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

  const handleCreateTask = async () => {
    const response = await fetch("http://localhost:5050/api/v2/task", {
      method: "POST",
      credentials: "include", // include credentials (cookies)
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskTitle: "watch a movie",
        description: "Godzilla X Kong : The New Empire Strikes Back",
        completed: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    } else {
      const responseData = await response.json();
      console.log(responseData);
    }
  };

  const handleShowTask = async () => {
    const response = await fetch("http://localhost:5050/api/v2/tasks", {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    } else {
      const responseData = await response.json();
      console.log(responseData);
      setTask(responseData);
    }
  };


  const handleLogout = async () => {
    const response = await fetch("http://localhost:5050/api/v2/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    } else {
      const responseData = await response.json();
      console.log("LOGGED OUT", responseData);
      navigate("/");

    }
  }


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
