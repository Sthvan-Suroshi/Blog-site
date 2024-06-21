import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  console.log(id);
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {/*  checking if option array contains some values else it will throw an error */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
{
  /* easy way to use forwardRef



HtmlFor is important as we will be reusing the component as unique id is required to identify */
}
