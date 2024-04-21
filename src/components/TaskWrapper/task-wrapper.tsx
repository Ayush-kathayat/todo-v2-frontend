import { useState } from "react";
import "./task-wrapper.css";

import TaskInput from "../InputTask/inputTask";
import TaskSearch from "../TaskSearch/taskSearch";
const TaskWrapper = () => {
  const [newTaskClicked, setNewTaskClicked] = useState(false); //! based on this i will switch between the create a new task and the search bar for the tasks
  return (
    <div className="task-wrapper">
      {newTaskClicked ? <TaskInput /> : <TaskSearch newTaskClicked={setNewTaskClicked} />}
    </div>
  );
};

export default TaskWrapper;
