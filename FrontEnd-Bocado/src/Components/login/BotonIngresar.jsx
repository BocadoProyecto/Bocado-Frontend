import { useState, useEffect } from "react";
import FormularioLogin from "./FormularioLogin";
import "./FormularioRegistro.css";
import FormularioRegistro from "./FormularioRegistro";
import "./BotonIngresar.css";

function BotonIngresar() {
  const [abierto, setAbierto] = useState(false);
  const [tipo, setTipo] = useState("cliente");
  const [modo, setModo] = useState("login");

  function cerrar() {
    setAbierto(false);
    setModo("login");
  }

  useEffect(() => {
    if (!abierto) return;

    function cerrarConEsc(e) {
      if (e.key === "Escape") cerrar();
    }

    document.addEventListener("keydown", cerrarConEsc);
    return () => document.removeEventListener("keydown", cerrarConEsc);
  }, [abierto]);

  return (
    <>
            <button className="btn btn--oscuro btn--sm" onClick={() => setAbierto(true)}>
        Ingresar
      </button>

      {abierto && (
        <div className="modal-fondo" onClick={cerrar}>
          <div
            className={modo === "registro" ? "modal modal--ancho" : "modal"}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-cerrar"
              aria-label="Cerrar"
              onClick={cerrar}
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

            {modo === "login" ? (
              <FormularioLogin
                tipo={tipo}
                onExito={cerrar}
                onIrARegistro={() => setModo("registro")}
              />
            ) : (
              <FormularioRegistro
              tipo={tipo}
              onIrALogin={() => setModo("login")}
                onExito={cerrar}
            />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BotonIngresar;
