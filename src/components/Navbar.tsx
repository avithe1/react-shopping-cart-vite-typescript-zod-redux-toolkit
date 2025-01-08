import { useAppSelector } from "../hooks/cartHooks";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { products } = useAppSelector((state) => state.cart);

  const mySet1 = new Set();
  products.map((product) => mySet1.add(product.id));

  return (
    <nav>
      <h1>React E-Commerce</h1>
      <div>
        <Link to="/cart">
          Cart {mySet1.size > 0 ? `(${mySet1.size})` : null}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
