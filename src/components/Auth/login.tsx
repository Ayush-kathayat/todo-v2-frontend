import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //! neccessary for zod to work with react-hook-form
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "./register.css";

import { LoginFormContext } from "../../App";
import seperateName from "../../utils/seperateName.ts";

import { LineWave } from "react-loader-spinner";
const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type T_loginSchema = z.infer<typeof loginSchema>;

import { login as loginAPI } from "..//..//utils/api/api.ts"; //! there was a naming conflict

const Login = () => {
  const { setAvatar } = useContext(LoginFormContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<T_loginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: T_loginSchema) => {
    const response = await loginAPI(data);

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    } else {
      const responseData = await response.json();
      console.log(responseData.name);

      const nameParts = seperateName(responseData.name);
      if (nameParts) {
        const { first, last } = nameParts; //? now i have the first and the last name now i will hit a the api with both the name
        console.log(first, last);
        const avatarResponse = await fetch(
          `https://ui-avatars.com/api/?name=${first}+${last}&background=random&rounded=true&size=50&bold=true&color=fff`
        );
        const avatarUrl = avatarResponse.url; // Extract the URL from the Response object
        setAvatar(avatarUrl); // Pass the URL string to setAvatar
      }
      reset();
      navigate("/home", { state: { data: responseData } });
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
        {errors.username && (
          <p className="form-errors">{errors.username.message}</p>
        )}
        <input
          className="input input-password"
          type="password"
          id="password"
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
