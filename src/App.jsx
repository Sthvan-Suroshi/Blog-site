import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const disptach = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);
          disptach(login({ userData }));
        } else {
          disptach(logout());
        }
      }, [])
      .finally(() => setLoading(false));
  });

  // conditonal rendering
  return loading ? null : (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-slate-200 items-center justify-center font">
        <div className="w-full flex items-center justify-center flex-col">
          <Header />
          <main className="min-h-96 ">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
