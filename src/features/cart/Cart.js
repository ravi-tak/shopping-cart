import { HiChevronLeft} from "react-icons/hi";
import CartItems from "./CartItems";
import { open } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);
  const numOfItems = cartItems.length;

  return (
    <div className="bg-transparentBlack fixed z-30 top-0 left-0 w-full h-screen">
      <div className="h-full bg-grey sm:w-[40rem] min-w-[15rem] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(open())}
            >
              <HiChevronLeft />
              <span className="uppercase font-bold text-[0.95rem] select-none">
                Continue Shopping
              </span>
            </div>
            <div className="font-bold">Shopping Bag ({numOfItems})</div>
          </div>
          <div className="mt-8">
            {cartItems.length === 0 ? (
              <div className="uppercase font-bold text-center text-3xl">
                Your cart is empty
              </div>
            ) : (
              <>
                {cartItems.map((cartItem) => {
                  return (
                    <CartItems
                      key={cartItem.id}
                      cartItem={cartItem}
                    />
                  );
                })}
                <div className="flex font-bold justify-between items-center mt-12">
                  Total Cost: ${total.toFixed(2)}
                </div>
                <div className="text-center cursor-pointer bg-black text-white p-3 mt-8">
                  CheckOut
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
