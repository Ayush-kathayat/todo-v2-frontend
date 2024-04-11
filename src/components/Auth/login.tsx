import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //! neccessary for zod to work with react-hook-form

import "./register.css";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type T_loginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T_loginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: T_loginSchema) => {

    const response  = await fetch();
    console.log(data);
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
          {...register("email")}
        />
        {errors.email && <p className = "form-errors" >{errors.email.message}</p>}
        <input
          className="input input-password"
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className = "form-errors" >{errors.password.message}</p>}
        <button className= "btn login-btn" type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
