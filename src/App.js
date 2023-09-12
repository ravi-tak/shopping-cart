import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import ShoppingContainer from "./components/ShoppingContainer";
import ItemDetails from "./components/ItemDetails";

function App() {
  return (
    <Routers>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/"
            element={<ShoppingContainer />}
          />
          <Route
            path="/item-details/:id"
            element={<ItemDetails />}
          />
        </Route>
      </Routes>
    </Routers>
  );
}

export default App;
