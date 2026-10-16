import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-red-600">
      <div className="mx-auto flex mx-auto w-full max-w-[920px] items-center justify-between p-4">
        <a className="logo">PULSO</a>
        <nav aria-label="Primary">
          <ul class="flex flex-row items-center gap-6">
            <li>
              <a href="#classes">Classes</a>
            </li>
            <li>
              <a href="#trainers">Trainers</a>
            </li>
            <li>
              <a href="#prices">Prices</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <button type="button">Bookings</button>
      </div>
    </header>
  );
};

export default Header;
