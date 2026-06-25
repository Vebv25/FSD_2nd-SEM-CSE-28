import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="navbar">
      <div className="nav-logo">
        <h2>amazon.in</h2>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search Amazon.in"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
      </div>

      <div className="nav-cart">
        <span>Cart</span>
      </div>
    </header>
  );
}

export default Navbar;