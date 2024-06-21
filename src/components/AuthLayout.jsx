import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/");
      console.log("auth navigation");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/login");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading please wait</h1> : <>{children}</>;
}
