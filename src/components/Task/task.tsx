import React from "react";
import "./task.css";

type TaskProps = {
  task: string;
};
const Task: React.FC<TaskProps> = ({ task }) => {
  // TODO : add props to task component
  return (
    <div className="task-holder">
      <div className="task">
        <div className="task-title">{task}</div>
        <div className="task-buttons">
          <button className="task-btn">
            <img src="edit.svg" alt="edit-icon" />
          </button>
          <button className="task-btn">
            <img src="check.svg" alt="check-icon" />
          </button>
        </div>
      </div>

      <button className="delete-btn">
        <img src="trash-2.svg" alt="delete-icon" />
      </button>
    </div>
  );
};

export default Task;
