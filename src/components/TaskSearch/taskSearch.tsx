import React, { useState } from "react";
import "./taskSearch.css";
const TaskSearch = ({newTaskClicked}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-header">

      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for tasks..."
        />

        <div className="search-icon-wrapper">
          <img src="search.svg" alt="search-icon" />
        </div>
      </div>

     
      <button className="new-task-button" onClick={() => newTaskClicked(true)}>New Task</button>   
    </div>
  );
};
export default TaskSearch;
