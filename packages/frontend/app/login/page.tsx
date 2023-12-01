"use client";

import { useState } from "react";

import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";

export default function Login() {
  const [formState, setFormState] = useState("login");

  const changeForm = () => {
    if (formState === "login") {
      setFormState("register");
    } else {
      setFormState("login");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {formState === "login" ? (
        <div className="flex flex-col text-center w-96">
          <h1 className="text-2xl font-bold pb-3">Login</h1>
          <p className="pb-3">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => {
                changeForm();
              }}
              className="hover:shadow-md font-bold"
            >
              Register
            </span>
          </p>
          <LoginForm />
        </div>
      ) : (
        <div className="flex flex-col text-center w-96">
          <h1 className="text-2xl font-bold pb-3">Create a new account</h1>
          <p className="pb-3">
            Already made an account?{" "}
            <p
              onClick={() => {
                changeForm();
              }}
              className="hover:shadow-lg hover:shadow-white font-bold"
            >
              Login
            </p>
          </p>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}
