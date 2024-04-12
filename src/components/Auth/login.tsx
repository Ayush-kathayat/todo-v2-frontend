import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //! neccessary for zod to work with react-hook-form

import "./register.css";
import { LineWave } from "react-loader-spinner";
const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type T_loginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<T_loginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: T_loginSchema) => {

    const response = await fetch("http://localhost:5050/api/v2/login", {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data), 
    })

    if(!response.ok){
      const errorData = await response.json();
      console.log(errorData.message);
    }
    else{
      const responseData = await response.json();
      console.log(responseData);
      reset();

    }
  };
  return (
    <div className="form-wrapper">
      <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Your input fields and submit button */}

        <h2 className="form-title">LOGIN</h2>
        <input
          className="input input-email"
          type="email"
          id="email"
          placeholder="Email"
          {...register("username")}
        />
        {errors.username && <p className = "form-errors" >{errors.username.message}</p>}
        <input
          className="input input-password"
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className = "form-errors" >{errors.password.message}</p>}
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
            className="btn login-btn"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
