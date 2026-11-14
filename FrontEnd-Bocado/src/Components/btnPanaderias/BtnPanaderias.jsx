import "./BtnPanaderias.css";

export default function BtnPanaderias({ onClick, claro = false }) {
  return (
    <button
      type="button"
      className={
        claro
          ? "btn btn-panaderias btn-panaderias--claro"
          : "btn btn-panaderias"
      }
      onClick={onClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
        <path d="M5 13v7h14v-7" />
        <path d="M10 20v-4h4v4" />
      </svg>
      Ir a panaderías
    </button>
  );
}
