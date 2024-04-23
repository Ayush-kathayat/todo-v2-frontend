import React from "react";
import "./task.css";

import { T_Task } from "../TaskWrapper/task-wrapper";
// In your Task component file
type TaskProps = {
  id: string;
  title: string;
  description: string;
  setTasks: React.Dispatch<React.SetStateAction<T_Task[]>>;
  deleteTask: (taskId: string) => Promise<void>;
};
const Task: React.FC<TaskProps> = ({ id, title, deleteTask}) => {
  const handleTaskDelete = async () => {
    deleteTask(id);
  };
  
 
  return (
    <div className="task-holder">
      <div className="task">
        <div className="task-title">{title}</div>
        <div className="task-buttons">
          <button className="task-btn">
            <img src="edit.svg" alt="edit-icon" />
          </button>
          <button className="task-btn">
            <img src="check.svg" alt="check-icon" />
          </button>
        </div>
      </div>

      <button onClick={handleTaskDelete} className="delete-btn">
        <img src="trash-2.svg" alt="delete-icon" />
      </button>
    </div>
  );
};

export default Task;
