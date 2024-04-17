const deleteTask = async (taskId: string): Promise<boolean> => {
  const response = await fetch(`http://localhost:5050/api/v2/task/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   console.error('Error:', errorData.message);
  // } else {
  //   const responseData = await response.json();
  //   console.log('Success:', responseData.message);
  // }

  return response.ok;
}

export default deleteTask;