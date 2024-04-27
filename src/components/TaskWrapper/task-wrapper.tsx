import { useState, useEffect } from "react";
import "./task-wrapper.css";

import TaskInput from "../InputTask/inputTask";
import TaskSearch from "../TaskSearch/taskSearch";

import Task from "../Task/task";

import { showTask } from "../../utils/api/api";

export type T_Task = {
  _id: string;
  taskTitle: string;
  description: string;
  completed: boolean;
  __v: number;
};

const TaskWrapper = () => {
  const [newTaskClicked, setNewTaskClicked] = useState(false); //! based on this i will switch between the create a new task and the search bar for the tasks
  const [tasks, setTasks] = useState<T_Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // TODO :  hit a get request to get all the tasks and pass them to the task component

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await showTask();
      setTasks(tasks);
    };

    fetchTasks();
  }, [setTasks]);

  const deleteTask = async (taskId: string) => {
    // Optimistically update the tasks state
    const originalTasks = tasks;
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

    try {
      const response = await fetch(
        `http://localhost:5050/api/v2/task/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting task");
      }
    } catch (error) {
      // If the delete operation fails, revert the tasks state back to its original form
      setTasks(originalTasks);
      console.error(error);
    }
  };

  const createTask = async (task: string) => {
    const response = await fetch("http://localhost:5050/api/v2/task", {
      method: "POST",
      credentials: "include", // include credentials (cookies)
      headers: {
        "content-type": "application/json",
      },

      //!: todo : don't hardcode the body  this function should able to take the body as an argument

      //! i hope you know what you need to do first make a datatype of this data below in the home  and then pass it here just

      //? just like the register and lgogin

      body: JSON.stringify({
        taskTitle: task,
        description: "land mera, dikha hi nahi raha hu main ise ",
        completed: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    } else {
      const responseData = await response.json();
      console.log(responseData);
      // Update tasks state with the new task
      setTasks((prevTasks) => [...prevTasks, responseData]);
    }
  };

  const updateTask = async (taskId: string, Task: T_Task): Promise<T_Task> => {
    const response = await fetch(
      `http://localhost:5050/api/v2/task/${taskId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskTitle: Task.taskTitle,
          description: "land mera, dikha hi nahi raha hu main ise ",
          completed: Task.completed,
        }),
      }
    );

    // if (!response.ok) {
    //   throw new Error("Failed to update task");
    // }


    const updatedTask = await response.json();

    console.log(updatedTask);

    return updatedTask;
  };

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Filter tasks based on the search term before rendering them
  const filteredTasks = tasks.filter((task) =>
    task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleUpdateTask = async (taskId: string, updatedTaskData: T_Task) => {
  //   try {
  //     const updatedTask = await updateTask(taskId, updatedTaskData);
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
  //     );
  //   } catch (error) {
  //     console.error("Failed to update task", error);
  //   }
  // };

  return (
    <div className="task-wrapper">
      {newTaskClicked ? (
        <TaskInput newTaskClicked={setNewTaskClicked} createTask={createTask} />
      ) : (
        <TaskSearch
          newTaskClicked={setNewTaskClicked}
          onSearchTermChange={handleSearchTermChange}
        />
      )}

      {/* todo : use map to render all the tasks */}

      {/* {tasks.map((task) => <Task key={task} task={task} /    const handleSearchTermChange = (newSearchTerm: string) => {
      setSearchTerm(newSearchTerm);
    };

    // Filter tasks based on the search term before rendering them
    const filteredTasks = tasks.filter((task) =>
      task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );>)} Use map to render a Task component for each task */}

      {/* Below here i am using a sort function to sort the tasks based on the completed status of the task with the help of the sort function and ternary operator */}
      {[...filteredTasks]
        .sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        )
        .map((task) => (
          <Task
            key={task._id}
            id={task._id}
            title={task.taskTitle}
            description={task.description}
            status={task.completed}
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
    </div>
  );
};

export default TaskWrapper;
