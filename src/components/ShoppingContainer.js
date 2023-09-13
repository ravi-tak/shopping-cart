import { useEffect } from "react";
import ShoppingItem from "./ShoppingItem";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../features/products/productsSlice";

// Products.js
const ShoppingContainer = () => {
  const { items, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return loading ? (
    <p className="section grid lg:w-[70%] md:w-[75%] lg:grid-cols-3 md:grid-cols-2 gap-6">
      Loading...
    </p>
  ) : (
    <div className="section grid lg:w-[70%] md:w-[75%] lg:grid-cols-3 md:grid-cols-2 gap-6">
      {items.map((item) => {
        return (
          <ShoppingItem
            key={item.id}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default ShoppingContainer;
