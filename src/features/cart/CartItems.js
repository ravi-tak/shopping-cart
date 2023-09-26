import { HiX } from "react-icons/hi";
import {
  decrementCartAsync,
  deleteCartAsync,
  incrementCartAsync,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItems = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { id, price, title, images, quantity } = cartItem;

  return (
    <div className="flex justify-between items-center border border-solid border-glass p-4 mb-6">
      <div className="flex items-center gap-4">
        <img
          src={images[0]}
          alt="image"
          className="w-20 h-20 object-cover"
        />
      </div>
      <div className="flex flex-col items-start max-w-[6.8rem]">
        <div>{title}</div>
        <div className="flex items-center gap-4 mt-2">
          <button
            className="w-8 h-8 text-white bg-black rounded-full "
            onClick={() =>
              dispatch(decrementCartAsync({ id, quantity: quantity - 1 }))
            }
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            className="w-8 h-8 text-white bg-black rounded-full "
            onClick={() =>
              dispatch(incrementCartAsync({ id, quantity: quantity + 1 }))
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <HiX
          className="cursor-pointer text-xl"
          onClick={() => dispatch(deleteCartAsync(id))}
        />
        <div className="font-bold">${(price * 1).toFixed(2)}/per</div>
      </div>
    </div>
  );
};

export default CartItems;
