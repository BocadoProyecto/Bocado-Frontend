import "./Navbar.css";
import logo from "../../assets/logo.png";
import BotonIngresar from "../login/BotonIngresar";

// que es? cartCount: cantidad en el carrito.
export default function Navbar({
  cartCount = 0,
  onInicio,
  onExplorar,
  onCarrito,
}) {
  // ver para q es
  function manejar(e, accion) {
    e.preventDefault();
    if (accion) accion();
  }

  return (
    <header className="navbar">
      <a
        href="#"
        className="navbar__logo"
        onClick={(e) => manejar(e, onInicio)}
      >
        <img src={logo} alt="Bocado" />
      </a>

      <nav className="navbar__nav">
        <a
          href="#"
          className="navbar__link"
          onClick={(e) => manejar(e, onExplorar)}
        >
          Explorar
        </a>

        {/* El login: botón + modal (Components/login) */}
        <BotonIngresar />

        <a
          href="#"
          className="btn btn--primary btn--sm navbar__cart"
          aria-label="Carrito"
          onClick={(e) => manejar(e, onCarrito)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.6 12.4a1.5 1.5 0 0 0 1.5 1.1h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
          </svg>
          <span>{cartCount}</span>
        </a>
      </nav>
    </header>
  );
}
