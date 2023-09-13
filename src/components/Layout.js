import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../features/cart/Cart";

const Layout = () => {
  const { isOpen } = useSelector((state) => state.cart);
  return (
    <div>
      <Navbar />
      {isOpen && <Cart/>}
      <Outlet />
    </div>
  );
};

export default Layout;
