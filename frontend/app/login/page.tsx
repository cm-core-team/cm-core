"use client";

import { LoginForm } from "./components/login-form";
import { useState } from "react";
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
    <div className="w-96">
      {formState === "login" ? (
        <div className="flex flex-col text-center">
          <h1>Login to your account</h1>
          <p>
            Don&apos;t have an account?{" "}
            <span
              onClick={() => {
                changeForm();
              }}
              className="hover:shadow-md"
            >
              Register
            </span>
          </p>
          <LoginForm />
        </div>
      ) : (
        <div className="flex flex-col text-center">
          <h1>Create a new account</h1>
          <p>
            Already made an account?{" "}
            <span
              onClick={() => {
                changeForm();
              }}
              className="hover:shadow-md"
            >
              Login
            </span>
          </p>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}
