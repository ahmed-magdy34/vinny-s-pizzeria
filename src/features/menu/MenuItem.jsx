import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { FaShoppingCart } from "react-icons/fa";
import { addItem, deleteItem, getQuantityById } from "../cart/cartSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import UpdateCartQuantity from "../cart/UpdateCartQuantity";
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const handleAddCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
      imageUrl,
    };
    dispatch(addItem(newItem));
  };
  const currentQuantity = useSelector(getQuantityById(id));
  const isInCart = currentQuantity > 0;
  return (
    <li className="flex gap-4 py-2 md:mx-2 md:mt-3 md:w-60 md:flex-col md:items-center md:justify-center md:rounded-md md:border md:text-center md:shadow-md lg:h-72">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 rounded-full ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-bold">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mx-1 mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-slate-400">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div className="flex items-center gap-2">
              <div className={`flex gap-1 ${!isInCart ? "hidden" : ""}`}>
                <UpdateCartQuantity pizzaId={id} />

                <div
                  onClick={() => {
                    dispatch(deleteItem(id));
                  }}
                  className={`cursor-pointer rounded-full bg-red-500 p-2 transition-all duration-500 hover:bg-red-300 hover:p-3`}
                >
                  <MdOutlineDeleteOutline className="text-white" />
                </div>
              </div>
              <div
                onClick={handleAddCart}
                className={`cursor-pointer ${isInCart ? "hidden" : ""} rounded-full bg-orange-400 p-2 transition-all duration-500 hover:bg-orange-300 hover:p-3 active:bg-orange-500`}
              >
                <FaShoppingCart className="text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
