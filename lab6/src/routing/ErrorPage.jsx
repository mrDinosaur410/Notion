import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
/*import styles from "../css/Styles.module.css";*/

export default function Error() {
  const navigation = useNavigate();
  return (
    <div className="w-3/4 mx-auto mt-12 text-center">
      <p className="font-bold text-7xl mb-14">404</p>
      <p className="text-3xl mb-10">Page not found</p>
      <p className="text-4xl flex justify-center gap-3">
        go
        <NavLink
          onClick={() => navigation("/")}
          className=" text-blue-600 underline"
        >
          Home
        </NavLink>
      </p>
      <div>
        <hr className="mt-10" />
        <footer className="flex justify-around text-xs md:text-base">
          <p>Created by: Cimur Citoŭ</p>
          <p>BSU: 2023</p>
        </footer>
      </div>
    </div>
  );
}
