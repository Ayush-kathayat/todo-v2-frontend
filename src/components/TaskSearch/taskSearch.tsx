import React, { useState } from "react";
import "./taskSearch.css";
const TaskSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for tasks..."
      />
    </div>
  );
};
export default TaskSearch;
