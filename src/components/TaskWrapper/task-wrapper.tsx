import { useState, useEffect } from "react";
import "./task-wrapper.css";

import TaskInput from "../InputTask/inputTask";
import TaskSearch from "../TaskSearch/taskSearch";

import Task from "../Task/task";

import {createTask, showTask} from "../../utils/api/api";

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
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  
    try {
      const response = await fetch(`http://localhost:5050/api/v2/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Error deleting task');
      }
    } catch (error) {
      // If the delete operation fails, revert the tasks state back to its original form
      setTasks(originalTasks);
      console.error(error);
    }
  };

  return (
    <div className="task-wrapper">
      {newTaskClicked ? (
        
        <TaskInput newTaskClicked={setNewTaskClicked} setTasks={setTasks} createTask={createTask} />
      ) : (
        <TaskSearch newTaskClicked={setNewTaskClicked} />
      )}

      {/* todo : use map to render all the tasks */}

      {/* {tasks.map((task) => <Task key={task} task={task} />)} Use map to render a Task component for each task */}

      {tasks.map((task) => (
        <Task
          key={task._id}
          id={task._id}
          title={task.taskTitle}
          description={task.description}
          setTasks={setTasks}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskWrapper;
