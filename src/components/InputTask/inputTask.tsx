import React, { useState } from "react";
import "./inputTask.css";

type TaskInputProps = {
  newTaskClicked: React.Dispatch<React.SetStateAction<boolean>>;
  createTask: (task: string) => Promise<void>;
};

const TaskInput: React.FC<TaskInputProps> = ({
  newTaskClicked,
  createTask,
}) => {
  const [title, setTitle] = useState("");

  const handleCreateTask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // prevent form submission
    createTask(title);
    setTitle(""); // clear the input field
  };

  return (
    <div className="input-task-container">
      <form className="task-input-wrapper">
        <input
          className="task-input"
          type="text"
          placeholder="Add a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // update title state when input changes
        />
        <button
          onClick={handleCreateTask}
          className="task-add-btn"
          type="submit"
        >
          <img src="plus.svg" alt="plus-icon" />
        </button>
      </form>

      <button className="search-button" onClick={() => newTaskClicked(false)}>
        SEARCH
      </button>
    </div>
  );
};

export default TaskInput;
