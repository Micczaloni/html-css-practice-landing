import { useState } from "react";

const navLinks = [
  { href: "#classes", label: "Classes" },
  { href: "#trainers", label: "Trainers" },
  { href: "#prices", label: "Prices" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 w-full max-w-full border-b border-transparent bg-[#f3f3f3]/92 backdrop-blur-sm">
      <div className="mx-auto flex w-full min-w-0 max-w-[920px] items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <a
          href="#home"
          className="shrink-0 text-base font-bold tracking-[0.08em] sm:text-lg"
        >
          PULSO
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <ul className="flex flex-row items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.95rem] font-medium text-gray-700 hover:text-black"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#classes"
            className="hidden rounded-full bg-[#c6d947] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b5c73a] sm:inline-flex"
          >
            Bookings
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-full bg-black transition ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-black transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-black transition ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-gray-200 bg-[#f3f3f3] md:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex w-full max-w-[920px] flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-md px-2 py-2.5 text-[0.95rem] font-medium text-gray-700 hover:bg-white hover:text-black"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a
                href="#classes"
                onClick={closeMenu}
                className="inline-flex rounded-full bg-[#c6d947] px-4 py-2 text-sm font-semibold text-black"
              >
                Bookings
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
