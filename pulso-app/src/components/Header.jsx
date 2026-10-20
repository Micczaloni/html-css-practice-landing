import { useState } from "react";
import { Link } from "react-router";
import { useSession, signOut } from "../lib/auth-client";

// /#… works from /login too; plain #… only works on the home page
const navLinks = [
  { href: "/#classes", label: "Classes" },
  { href: "/#trainers", label: "Trainers" },
  { href: "/#prices", label: "Prices" },
  { href: "/#contact", label: "Contact" },
];

const Header = () => {
  // tracks whether the burger menu is open
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  // close after clicking a link so the panel doesn't stay open
  const closeMenu = () => setMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-20 w-full max-w-full border-b border-black/5 bg-[#f3f3f3]/70 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-md supports-[backdrop-filter]:bg-[#f3f3f3]/55">
      <div className="mx-auto flex w-full min-w-0 max-w-[920px] items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <Link
          to="/"
          className="shrink-0 text-base font-bold tracking-[0.08em] sm:text-lg"
        >
          PULSO
        </Link>

        {/* Desktop only — hidden below md */}
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
          {session?.user ? (
            <>
              <span className="hidden max-w-[10rem] truncate text-sm text-gray-600 sm:inline md:max-w-[14rem]">
                Hello,{" "}
                <span className="font-semibold text-black">
                  {session.user.name || session.user.email}
                </span>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden cursor-pointer text-sm font-medium text-gray-700 hover:text-black sm:inline-flex"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden text-sm font-medium text-gray-700 hover:text-black sm:inline-flex"
            >
              Sign in
            </Link>
          )}
          <a
            href="/#classes"
            className="hidden rounded-full bg-[#c6d947] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b5c73a] sm:inline-flex"
          >
            Bookings
          </a>

          {/* Burger button — only on small screens. Click flips menuOpen. */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            {/* three bars -> X when open */}
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

      {/* Mobile menu — only renders when menuOpen is true */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-black/5 bg-[#f3f3f3]/80 backdrop-blur-md md:hidden"
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
            <li>
              {session?.user ? (
                <>
                  <p className="px-2 py-2 text-[0.95rem] text-gray-600">
                    Hello,{" "}
                    <span className="font-semibold text-black">
                      {session.user.name || session.user.email}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="block w-full cursor-pointer rounded-md px-2 py-2.5 text-left text-[0.95rem] font-medium text-gray-700 hover:bg-white hover:text-black"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-md px-2 py-2.5 text-[0.95rem] font-medium text-gray-700 hover:bg-white hover:text-black"
                >
                  Sign in
                </Link>
              )}
            </li>
            <li className="pt-2 sm:hidden">
              <a
                href="/#classes"
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
