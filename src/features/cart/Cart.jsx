import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="mx-7 sm:mx-0 md:mx-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <button
          onClick={() => dispatch(clearCart())}
          className="inline-block rounded-full border-2 border-stone-300 py-1 text-sm font-semibold text-stone-400 hover:bg-stone-300 hover:text-stone-800 md:px-6 md:py-3.5"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
