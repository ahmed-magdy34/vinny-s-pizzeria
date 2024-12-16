import { IoCartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getTotalCartPizzas } from "./cartSlice";
import { useNavigate } from "react-router-dom";
const CartIconNumber = () => {
  const cartItemsLength = useSelector(getTotalCartPizzas);
  const navigate = useNavigate();
  return (
    <div className="text-orange-500">
      <IoCartSharp
        onClick={() => navigate("/cart")}
        className="cursor-pointer"
        size={30}
      />
      <div className="absolute right-3 top-2 rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
        <p>{cartItemsLength}</p>
      </div>
    </div>
  );
};

export default CartIconNumber;
