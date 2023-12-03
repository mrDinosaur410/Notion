import React, { useState, useEffect } from "react";
import { z } from "zod";
import ApiFetch from "../util/ApiFetch";
import Input from "../util/Input";
import Button from "../util/Button";
import { useNavigate } from "react-router-dom";
import User from "../util/validation";
/*import styles from "../css/Styles.module.css";*/

export default function SignUp() {
  localStorage.removeItem("userId");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [comparePasswors, setComparePasswors] = useState(true);
  const [userAliasExist, setUserAliasExist] = useState(true);
  const [userEmailExist, setUserEmailExist] = useState(true);
  const [errors, setErrors] = useState(null);
  const [users, setUsers] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await ApiFetch.getUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  function handleSignUp() {
    try {
      const userAliasExists = users.some((user) => user.alias === alias);
      if (userAliasExists) {
        setUserAliasExist(false);
        throw new Error("A user with this alias exists");
      } else {
        setUserAliasExist(true);
      }
      const userEmailExists = users.some((user) => user.email === email);
      if (userEmailExists) {
        setUserEmailExist(false);
        throw new Error("A user with this email exists");
      } else {
        setUserEmailExist(true);
      }
      if (password !== repeatPassword) {
        setComparePasswors(false);
        throw new Error("Passwords don't match");
      }
      const user = User.parse({
        alias,
        email,
        password,
      });
      setErrors(null);
      ApiFetch.signUp(alias, email, password);
      navigation("/login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }

  return (
    <div
      className="w-3/4 mx-auto mt-12 text-center" /*className={`${styles.container}`}*/
    >
      <div className="grid gap-4 mb-6 md:grid-cols-1">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
          Sign Up
        </h1>
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Alias
          </div>
          <Input
            $type="text"
            $placeholder="SigmaPie345"
            $onDataChange={setAlias}
          />
        </div>
        {!userAliasExist && (
          <div className="text-red-500">A user with this alias exists</div>
        )}
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Email address
          </div>
          <Input
            $type="email"
            $placeholder="yury.pazniak@bsu.by"
            $onDataChange={setEmail}
          />
          {errors?.email && (
            <div className="text-red-500">{errors?.email?._errors}</div>
          )}
        </div>
        {!userEmailExist && (
          <div className="text-red-500">A user with this email exists</div>
        )}
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Password
          </div>
          <Input
            $type="password"
            $placeholder="••••••••"
            $onDataChange={setPassword}
          />
          {errors?.password && (
            <div className="text-red-500">{errors?.password?._errors}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Repeat password
          </div>
          <Input
            $type="password"
            $placeholder="••••••••"
            $onDataChange={(value) => {
              setRepeatPassword(value);
              setComparePasswors(true);
            }}
          />
          {!comparePasswors && (
            <div className="text-red-500">Passwords don't match</div>
          )}
        </div>
      </div>
      <Button $text="Sign Up" $handleOnClick={handleSignUp} />
      <div>
        <Button $text="Login" $to="/login" />
      </div>
    </div>
  );
}
