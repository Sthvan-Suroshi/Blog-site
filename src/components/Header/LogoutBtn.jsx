import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={logutHandler}
      className="inline-bock px-6 py-2 duration-200 hover:bg-red-100 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
