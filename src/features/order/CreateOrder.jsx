import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressErorr,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  console.log(formErrors);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const prirotyPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + prirotyPrice;
  const dispatch = useDispatch();
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="font-mono mb-8 text-center text-3xl font-semibold">{`Ready to order? Let's go!`}</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              defaultValue={username}
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className={`input w-full ${formErrors?.phone ? "border-red-500" : ""}`}
            />
            {formErrors?.phone && (
              <p className="mt-1 rounded-full bg-red-100 p-2 text-center text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="mt-1 rounded-full bg-red-100 p-2 text-center text-xs text-red-600">
                {addressErorr}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <button
              disabled={isLoadingAddress}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              className="absolute right-[0px] top-[29px] rounded-full bg-orange-300 px-2 py-1.5 text-sm font-semibold hover:bg-orange-400 sm:right-1 sm:top-0 sm:py-3"
            >
              Get Address
            </button>
          )}
        </div>

        <div className="mb-12 flex items-center gap-3">
          <input
            className="h-3 w-3 accent-orange-600"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.longitude},${position.latitude}`
                : ""
            }
          />
          <Button disapled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "placing order"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priroty: data.priroty === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "please provide a valid phone number";
  }
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
