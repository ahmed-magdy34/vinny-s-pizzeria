import { Link } from "react-router-dom";
import emptyImage from "../../assets/11329060.png";
import LinkButton from "../../ui/LinkButton";
function EmptyCart() {
  return (
    <div className="ml-2 sm:ml-0">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <div className="flex flex-col items-center justify-center">
        <img src={emptyImage} className="h-72 w-72" alt="empty" />
        <p className="text-center text-xl font-bold text-orange-500">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
