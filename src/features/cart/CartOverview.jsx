import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPizzas, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartPizzas = useSelector(getTotalCartPizzas);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartPizzas) return null;
  return (
    <div className="flex justify-between bg-stone-800 px-4 py-4 uppercase text-white sm:px-6">
      <p className="space-x-4 font-semibold">
        <span>{totalCartPizzas} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
