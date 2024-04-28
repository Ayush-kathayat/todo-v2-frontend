import React, { useState } from "react";
import "./task.css";

import { T_Task } from "../TaskWrapper/task-wrapper";
import updateTask from "../../utils/api/updateTask";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  setTasks: React.Dispatch<React.SetStateAction<T_Task[]>>;
  tasks: T_Task[];
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, Task: T_Task) => Promise<T_Task>;
};

const Task: React.FC<TaskProps> = ({
  id,
  title,
  deleteTask,
  status,
  setTasks,
  tasks,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const handleTaskDelete = async () => {
    deleteTask(id);
  };

  const handleTaskDone = async () => {
    if (isEditing) {
      // If the task is being edited, update the task title
      const originalTasks = tasks;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, taskTitle: currentTitle } : task
        )
      );

      try {
        const updatedTask = await updateTask(id, {
          taskTitle: currentTitle,
          completed: status,
        });

        setIsEditing(false);
      } catch (error) {
        // If the update operation fails, revert the tasks state back to its original form
        setTasks(originalTasks);
        console.error("Failed to update task", error);
      }
    } else {
      // If the task is not being edited, toggle the completed status
      const originalTasks = tasks;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !status } : task
        )
      );

      try {
        const updatedTask = await updateTask(id, {
          taskTitle: title,
          completed: !status,
        });
      } catch (error) {
        // If the update operation fails, revert the tasks state back to its original form
        setTasks(originalTasks);
        console.error("Failed to update task", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  return (
    <div className={`task-holder ${status ? "completed" : ""}`}>
      <div className={`task ${isEditing ? "rect" : ""}`}>
        {isEditing ? (
          <input
            type="text"
            value={currentTitle}
            onChange={handleInputChange}
            className="edit-task-title-input"
          />
        ) : (
          <div className="task-title">{title}</div>
        )}
        <div className="task-buttons">
          <button className={`task-btn ${isEditing ? "hide" : ""}`} onClick={handleEdit}>
            <img src="edit.svg" alt="edit-icon" />
          </button>
          <button onClick={handleTaskDone} className="task-btn">
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
