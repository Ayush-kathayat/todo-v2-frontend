import { useState } from "react";
import "./task-wrapper.css";

import TaskInput from "../InputTask/inputTask";
import TaskSearch from "../TaskSearch/taskSearch";

import Task from "../Task/task";
const TaskWrapper = () => {
  const [newTaskClicked, setNewTaskClicked] = useState(false); //! based on this i will switch between the create a new task and the search bar for the tasks

  // TODO :  hit a get request to get all the tasks and pass them to the task component
  return (
    <div className="task-wrapper">
      {newTaskClicked ? <TaskInput newTaskClicked={setNewTaskClicked} /> : <TaskSearch newTaskClicked={setNewTaskClicked} />}

      {/* todo : use map to render all the tasks */}
      
      <Task task="Task 1" />
    </div>
  );
};

export default TaskWrapper;
