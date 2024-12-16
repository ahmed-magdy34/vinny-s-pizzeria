import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, disapled, onClick, to }) => {
  const className =
    "rounded-full bg-orange-400 py-1  font-semibold text-sm w-[120px] text-white transition-colors duration-300 hover:bg-orange-300 focus:bg-orange-300 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:w-[200px] sm:px-6 sm:py-4";

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  return (
    <button disabled={disapled} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
