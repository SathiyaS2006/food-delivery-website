import React, { useState, useEffect } from "react";
import "./App.css";

const foodsData = [
  { id: 1, name: "Burger", price: 120, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Pizza", price: 250, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Sandwich", price: 90, image: "https://via.placeholder.com/150" },
];

function App() {

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {

    const existing = cart.find(item => item.id === food.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }

  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredFoods = foodsData.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container">

      <h1>🍔 Food Ordering System</h1>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="products">

        {filteredFoods.map(food => (

          <div key={food.id} className="card">

            <img src={food.image} alt={food.name} />

            <h3>{food.name}</h3>

            <p>₹{food.price}</p>

            <button onClick={() => addToCart(food)}>
              Add to Cart
            </button>

          </div>

        ))}

      </div>

      <h2>Your Order</h2>

      {cart.length === 0 ? (
        <p>No items added</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">

              <span>{item.name}</span>

              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <span>₹{item.price * item.quantity}</span>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>

            </div>
          ))}

          <h3>Total Amount: ₹{totalAmount}</h3>

          <button
            className="checkout-btn"
            onClick={() => setShowCheckout(true)}
          >
            Checkout
          </button>
        </>
      )}

      {showCheckout && (

        <div className="checkout">

          <h2>Delivery Details</h2>

          <input type="text" placeholder="Customer Name" />

          <input type="text" placeholder="Address" />

          <button
            onClick={() => alert("Food Order Placed Successfully")}
          >
            Place Order
          </button>

        </div>

      )}

    </div>

  );
}

export default App;