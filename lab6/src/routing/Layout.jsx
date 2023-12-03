import React, { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
/*import styles from "../css/Styles.module.css";*/

export default function Layout() {
  const { user } = useContext(UserContext);
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigation("/login");
  };
  if (localStorage.getItem("userId")) {
    return (
      <div
        className="w-3/4 mx-auto mt-12 text-center" /*className={styles.container}*/
      >
        <div className="flex justify-between flex-col-reverse md:flex-row">
          <p className="my-8 md:my-auto" /*className={styles.hello}*/>
            Hello, {user.alias}
          </p>
          <nav className="flex gap-5 justify-between text-sm md:justify-normal md:text-base">
            <NavLink
              to="/"
              end="true"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg text-green-500 no-underline"
                  : "font-semibold text-lg text-black no-underline"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg text-green-500 no-underline"
                  : "font-semibold text-lg text-black no-underline"
              }
            >
              Notes
            </NavLink>
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="font-semibold text-lg text-black no-underline"
            >
              Log Out
            </NavLink>
          </nav>
        </div>
        <Outlet />
        <hr className="mt-10" />
        <footer
          className="flex justify-around text-xs md:text-base" /*className={`flex justify-between ${styles.footer}`}*/
        >
          <p className="ml-2.5">Created by: Cimur Citoŭ</p>
          <p className="mr-2.5">BSU: 2023</p>
        </footer>
      </div>
    );
  } else {
    return (
      <div>
        <Outlet />
        <hr className="mt-10" />
        <footer
          className="flex justify-around text-xs md:text-base" /*className={`flex justify-between ${styles.footer}`}*/
        >
          <p className="ml-2.5">Created by: Cimur Citoŭ</p>
          <p className="mr-2.5">BSU: 2023</p>
        </footer>
      </div>
    );
  }
}