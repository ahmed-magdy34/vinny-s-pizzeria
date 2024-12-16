import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const UserName = () => {
  const userName = useSelector((state) => state.user.userName);
  const [show, setShow] = useState(false);
  return (
    // <div className="hidden text-sm font-semibold md:block">{userName}</div>
    <div
      className="hidden cursor-pointer text-black hover:text-orange-500 md:block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <FaUser className="h-6 w-6" />
      <div
        className={`absolute right-24 top-4 rounded-full ${!show ? "hidden" : ""} bg-orange-500 px-6 font-semibold text-white transition-all duration-500`}
      >
        {userName ? userName : "?"}
      </div>
    </div>
  );
};

export default UserName;
