import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteItem } from "./cartSlice";
import UpdateCartQuantity from "./UpdateCartQuantity";

function CartItem({ item }) {
  const { pizzaId, name, imageUrl, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartQuantity pizzaId={pizzaId} />
        <div
          onClick={() => dispatch(deleteItem(pizzaId))}
          className="cursor-pointer rounded-full bg-red-500 p-2 transition-all duration-500 hover:bg-red-300 hover:p-3"
        >
          <MdOutlineDeleteOutline className="text-white" />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
