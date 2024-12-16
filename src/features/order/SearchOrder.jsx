import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-slate-300 px-2 py-2 text-sm transition-all duration-300 placeholder:text-[11px] placeholder:text-black focus:outline-none sm:w-64 sm:placeholder:text-sm sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
