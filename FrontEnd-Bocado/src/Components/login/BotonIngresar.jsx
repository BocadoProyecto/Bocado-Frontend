import { useState, useEffect } from "react";
import FormularioLogin from "./FormularioLogin";
import "./FormularioRegistro.css";
import FormularioRegistro from "./FormularioRegistro";
import "./BotonIngresar.css";

// abierto / onAbrir / onCerrar: el App decide cuándo se muestra el modal
// (así el carrito puede abrirlo si no hay sesión).
// sesion: { token, nombre } o null. onLogin(sesion) y onSalir() los maneja el App.
function BotonIngresar({ abierto, onAbrir, onCerrar, sesion, onLogin, onSalir }) {
  const [tipo, setTipo] = useState("cliente");
  const [modo, setModo] = useState("login");
  const [aviso, setAviso] = useState("");

  function cerrar() {
    onCerrar();
    setModo("login");
    setAviso("");
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
      {sesion ? (
        <button className="btn btn--oscuro btn--sm" onClick={onSalir}>
          Salir ({sesion.nombre})
        </button>
      ) : (
        <button className="btn btn--oscuro btn--sm" onClick={onAbrir}>
          Ingresar
        </button>
      )}

      {abierto && !sesion && (
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
                aviso={aviso}
                onExito={(datos) => {
                  onLogin(datos);
                  setModo("login");
                  setAviso("");
                }}
                onIrARegistro={() => {
                  setAviso("");
                  setModo("registro");
                }}
              />
            ) : (
              <FormularioRegistro
                tipo={tipo}
                onIrALogin={() => setModo("login")}
                onExito={() => {
                  setAviso("Cuenta creada. Ingresá con tu email y contraseña.");
                  setModo("login");
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BotonIngresar;