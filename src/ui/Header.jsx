import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";
import CartIconNumber from "../features/cart/CartIconNumber";

export default function Header() {
  return (
    <header className="flex justify-between px-4 py-3">
      <Link className="font-mono text-xl font-bold tracking-widest" to="/">
        Vinnys <span className="text-orange-400">Pizzeria</span>{" "}
      </Link>
      <SearchOrder />
      <div className="flex items-center gap-4">
        <UserName />
        <CartIconNumber />
      </div>
    </header>
  );
}
