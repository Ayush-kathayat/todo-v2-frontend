import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //! neccessary for zod to work with react-hook-form

import "./register.css";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type T_registerSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<T_registerSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: T_registerSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div className="form-wrapper">
      <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">SIGN-UP</h2>
        <input
          className="input input-name"
          type="text"
          placeholder="Username"
          {...register("username")} //! same as register("username", {required: "Username is required"})
        />
        {errors.username && <p className = "form-errors" >{errors.username.message}</p>}
        <input
          className="input input-email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className = "form-errors" >{errors.email.message}</p>}
        <input
          className="input input-password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className = "form-errors" >{errors.password.message}</p>}
        <button className="btn sbumit-btn" type="submit" disabled={isSubmitting}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
