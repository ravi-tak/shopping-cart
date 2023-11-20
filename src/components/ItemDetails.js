import { useParams } from "react-router-dom";
// import { add } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCartAsync } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { getProductByIdAsync } from "../features/products/productsSlice";
import NotFound from "./NotFound";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { item, loading } = useSelector((state) => state.products);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductByIdAsync(id));
  }, []);
  const firstImageSrc = item && item.images && item.images[0];

  if (id > 30) {
    return <NotFound />;
  } else {
    return loading ? (
      <p className="section grid lg:w-[70%] md:w-[75%] lg:grid-cols-3 md:grid-cols-2 gap-6">
        Loading...
      </p>
    ) : (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="lg:flex items-center justify-center">
          <img
            src={firstImageSrc}
            alt="image"
            className="lg:w-[22rem] w-[200px] me-8"
          />
          <div>
            <div className="mt-4 text-3xl font-extrabold mb-4">
              {item.title}
            </div>
            <div className="mb-4">${item.price}</div>
            <p className="max-w-[400px] mb-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique recusandae reiciendis, ad iure accusantium magni,
              quisquam nisi asperiores incidunt quibusdam dolores deleniti.
              Fugiat, nisi magnam.
            </p>
            <button
              className="bg-black text-white p-3 mb-4"
              onClick={() => dispatch(addCartAsync({ ...item, quantity: 1 }))}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemDetails;
