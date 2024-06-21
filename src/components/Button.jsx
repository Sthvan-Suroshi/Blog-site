import React from "react";

function Button({
  children, // children is nothing but text inside button which should be shown on button
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-3 rounded-lg w-full ${className} hover:shadow-md duration-300 `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

//* we give default values which can be overwritten according to needs

//* making common button to reuse the component
