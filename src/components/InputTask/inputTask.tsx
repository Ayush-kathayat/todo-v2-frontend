import "./inputTask.css";
const TaskInput = ({newTaskClicked}) => {
  return (
    <div className="input-task-container">
      <form className="task-input-wrapper">
        <input className="task-input" type="text" placeholder="Add a task" />
        <button className="task-add-btn"type="submit">
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
