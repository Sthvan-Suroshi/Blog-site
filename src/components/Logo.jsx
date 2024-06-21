import React from "react";
import LogoImg from "../assets/logo.png"

function Logo({ width = "100px" }) {
  return (
    <div>
      <img width={width} src={LogoImg} alt="logo" />
    </div>
  );
}

export default Logo;
