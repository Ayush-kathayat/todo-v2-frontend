//! todo : pass the data in the the T_registerSchema from the register component 


const Register = async (data: T_registerSchema): Promise<boolean> => {
  const response = await fetch("http://localhost:5050/api/v2/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.ok;
};


export default Register;
