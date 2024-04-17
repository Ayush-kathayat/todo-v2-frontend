const Logout = async (): Promise<boolean> => {
  const response = await fetch("http://localhost:5050/api/v2/logout", {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  // if (!response.ok) {       //! this thing i will do in the logout component 
  //   const errorData = await response.json();
  //   console.log(errorData.message);
  // } else {
  //   const responseData = await response.json();
  //   console.log("LOGGED OUT", responseData);
  //   navigate("/");

  // }
  return response.ok;
};
export default Logout;
