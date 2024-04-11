import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //! neccessary for zod to work with react-hook-form
import { useNavigate} from "react-router-dom";

import { LineWave } from "react-loader-spinner";

import "./register.css";

const registerSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type T_registerSchema = z.infer<typeof registerSchema>;

const Register = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<T_registerSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: T_registerSchema) => {
    const response = await fetch("http://localhost:5050/api/v2/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json(); // or response.text() if the response is not JSON
      console.log(errorData.message);
    }
    else{
      const responseData = await response.json();
      console.log(responseData);
      reset();

      navigate("/home", { state : { data : responseData}});
    }
  
   
  };

  return (
    <div className="form-wrapper">
      <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">SIGN-UP</h2>
        <input
          className="input input-name"
          type="text"
          placeholder="Username"
          {...register("name")} //! same as register("username", {required: "Username is required"})
        />
        {errors.name && (
          <p className="form-errors">{errors.name.message}</p>
        )}
        <input
          className="input input-email"
          type="email"
          placeholder="Email"
          {...register("username")}
        />
        {errors.username && <p className="form-errors">{errors.username.message}</p>}
        <input
          className="input input-password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="form-errors">{errors.password.message}</p>
        )}
        {isSubmitting ? (
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        ) : (
          <button
            className="btn sbumit-btn"
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
