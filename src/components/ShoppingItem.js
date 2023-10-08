import { addCartAsync } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ShoppingItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, images, price, title } = item;

  return (
    <div>
      <Link to={`/item-details/${id}`}>
        <div className="bg-grey h-[400px] flex items-center justify-center">
          <img
            src={images[0]}
            alt="image"
            className="w-[200px]"
          />
        </div>
      </Link>
      <div className="mt-6 flex justify-between items-center px-4 gap-x-5">
        <div>
          <div className="text-sm font-bold mb-3">{title}</div>
          <div className="text-xl font-bold">${price}</div>
        </div>
        <button
          className="bg-grey p-3 font-bold min-w-[45%]"
          onClick={() => dispatch(addCartAsync({ ...item, quantity: 1 }))}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingItem;
