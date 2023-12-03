import React, { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import Button from "../util/Button";

export default function HomePage() {
  const { user } = useContext(UserContext);
  var options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return (
    <div>
      <p className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
        About me
      </p>
      <p>
        <b>Email: </b>
        {user.email}
      </p>
      <p>
        <b>Registration date: </b>
        {new Date(user.createdAt).toLocaleDateString("ru-RU", options)}
      </p>
      <Button $to="/notes" $text="See notes" />
    </div>
  );
}
