import { useState, useEffect } from "react";
import FormularioLogin from "./FormularioLogin";
import "./BotonIngresar.css";

function BotonIngresar() {
  const [abierto, setAbierto] = useState(false);
  const [tipo, setTipo] = useState("cliente");

  useEffect(() => {
    if (!abierto) return;

    function cerrarConEsc(e) {
      if (e.key === "Escape") setAbierto(false);
    }

    document.addEventListener("keydown", cerrarConEsc);
    return () => document.removeEventListener("keydown", cerrarConEsc);
  }, [abierto]);

  return (
    <>
      <button className="btn btn--outline btn--sm" onClick={() => setAbierto(true)}>
        Ingresar
      </button>

      {abierto && (
        <div className="modal-fondo" onClick={() => setAbierto(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-cerrar"
              aria-label="Cerrar"
              onClick={() => setAbierto(false)}
            >
              ✕
            </button>

            <div className="modal-pestanas">
              <button
                className={tipo === "cliente" ? "activa" : ""}
                onClick={() => setTipo("cliente")}
              >
                Soy cliente
              </button>
              <button
                className={tipo === "panaderia" ? "activa" : ""}
                onClick={() => setTipo("panaderia")}
              >
                Soy panadería
              </button>
            </div>

            <FormularioLogin tipo={tipo} onExito={() => setAbierto(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default BotonIngresar;
