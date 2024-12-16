import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  getQuantityById,
  increaseQuantity,
} from "./cartSlice";

const UpdateCartQuantity = ({ pizzaId }) => {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantityById(pizzaId));
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => dispatch(decreaseQuantity(pizzaId))}
        className="rounded-full bg-slate-400 px-2 font-semibold text-white transition-all duration-500 hover:bg-slate-500 hover:py-1 active:bg-slate-600"
      >
        -
      </button>
      <p className="font-bold">{currentQuantity}</p>
      <button
        onClick={() => dispatch(increaseQuantity(pizzaId))}
        className="rounded-full bg-slate-400 px-2 font-semibold text-white transition-all duration-500 hover:bg-slate-500 hover:py-1 active:bg-slate-600"
      >
        +
      </button>
    </div>
  );
};

export default UpdateCartQuantity;
