//todo : make the Task type in the home component and pass it here

const UpdateTask = async (taskId: string, data: Task) => {
  const response = await fetch(`http://localhost:5050/api/v2/task/${taskId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.ok;
};


export default UpdateTask;