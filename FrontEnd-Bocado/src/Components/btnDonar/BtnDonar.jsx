import { useState, useEffect } from "react";
import "./BtnDonar.css";

export default function BtnDonar({ activo, onCambiar }) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("modo-donar", activo);
    return () => document.body.classList.remove("modo-donar");
  }, [activo]);

  useEffect(() => {
    if (!abierto) return;

    function cerrarConEsc(e) {
      if (e.key === "Escape") setAbierto(false);
    }

    document.addEventListener("keydown", cerrarConEsc);
    return () => document.removeEventListener("keydown", cerrarConEsc);
  }, [abierto]);

  function manejarClick() {
    if (activo) {
      onCambiar(false);
      return;
    }
    setAbierto(true);
  }

  function activar() {
    onCambiar(true);
    setAbierto(false);
  }

  return (
    <>
      <button
        type="button"
        className={
          activo
            ? "btn btn--sm btn-donar btn-donar--activo"
            : "btn btn--sm btn-donar"
        }
        aria-pressed={activo}
        onClick={manejarClick}
      >
        <span className="btn-donar__punto" aria-hidden="true"></span>
        {activo ? "Donando" : "Modo donar"}
      </button>

      {abierto && (
        <div className="modal-fondo" onClick={() => setAbierto(false)}>
          <div
            className="modal btn-donar__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="btn-donar-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-cerrar"
              aria-label="Cerrar"
              onClick={() => setAbierto(false)}
            >
              ✕
            </button>

            <span className="btn-donar__icono" aria-hidden="true">
              💛
            </span>
            <h2 id="btn-donar-titulo" className="btn-donar__titulo">
              Modo donar
            </h2>
            <p className="btn-donar__texto">
              Todo lo que agregues al carrito se va a donar a un comedor. Vos
              pagás, Bocado se encarga de que llegue.
            </p>

            <ul className="btn-donar__lista">
              <li>No tenés que elegir a quién donar.</li>
              <li>No hace falta retirar el pedido.</li>
              <li>Lo apagás cuando quieras desde el mismo botón.</li>
            </ul>

            <div className="btn-donar__acciones">
              <button
                type="button"
                className="btn btn--primary btn-donar__activar"
                onClick={activar}
              >
                Activar modo donar
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setAbierto(false)}
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
