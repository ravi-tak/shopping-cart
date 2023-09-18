import { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { getCartAsync, open } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const numOfItems = cartItems.length;
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  return (
    <div
      className={`${
        scroll ? "bg-grey shadow-lg" : ""
      } fixed top-0 left-0 w-full z-20`}
    >
      <div className="lg:w-[70%] md:w-[75%] flex items-center justify-between relative container py-4 px-2 md:px-4 mx-auto px-4">
        <Link to="/">
          <div className="font-bold text-xl">RKT</div>
        </Link>
        <div
          className="relative cursor-pointer"
          onClick={() => dispatch(open())}
        >
          <BiShoppingBag className="text-3xl opacity-80" />
          <div className="absolute w-4 h-4 rounded-full z-10 right-[-3px] bottom-[-3px] flex items-center justify-center text-[10px] bg-black text-white">
            {numOfItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
