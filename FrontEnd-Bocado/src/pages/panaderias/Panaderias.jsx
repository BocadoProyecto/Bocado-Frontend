import { useState, useEffect } from "react";
import "./Panaderias.css";
import { API_URL } from "../../config";
export default function Panaderias({ onVolver, onVerPanaderia }) {
  const [panaderias, setPanaderias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [errorServidor, setErrorServidor] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/panaderias`)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setPanaderias(datos);
        setErrorServidor("");
      })
      .catch(() => setErrorServidor("No pudimos conectar con el servidor."))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/productos`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch(() => setErrorServidor("No pudimos conectar con el servidor."));
  }, []);

  function cantidadDeProductos(nombre) {
    return productos.filter((p) => p.panaderia === nombre).length;
  }

  const visibles = panaderias.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()),
  );

  return (
    <section className="panaderias">
      <button type="button" className="catalogo__volver" onClick={onVolver}>
        ← Volver
      </button>
      <h2 className="panaderias__titulo">Panaderías</h2>
      <p className="panaderias__subtitulo">
        Conocé las panaderías que se suman a Bocado y mirá lo que tienen hoy.
      </p>

      <div className="panaderias__barra">
        <label className="panaderias__buscador">
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
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Buscar por nombre"
            aria-label="Buscar panadería"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>
        <p className="panaderias__cantidad">
          {visibles.length} {visibles.length === 1 ? "panadería" : "panaderías"}
        </p>
      </div>

      {errorServidor && <p className="catalogo__vacio">{errorServidor}</p>}

      {cargando && !errorServidor && (
        <p className="catalogo__vacio">Cargando panaderías...</p>
      )}

      {!cargando && !errorServidor && visibles.length === 0 && (
        <p className="catalogo__vacio">
          No encontramos panaderías con ese nombre.
        </p>
      )}

      <div className="panaderias__grilla">
        {visibles.map((panaderia) => {
          const cantidad = cantidadDeProductos(panaderia.nombre);

          return (
            <article key={panaderia.id} className="panaderia-card">
              <div className="panaderia-card__imagen">
                {panaderia.logo ? (
                  <img
                    className="panaderia-card__foto"
                    src={`${API_URL}/Imagenes/Panaderias/${panaderia.logo}`}
                    alt={panaderia.nombre}
                  />
                ) : (
                  <span className="panaderia-card__inicial" aria-hidden="true">
                    {panaderia.nombre[0]}
                  </span>
                )}
                <span className="panaderia-card__productos">
                  {cantidad === 1
                    ? "1 producto hoy"
                    : `${cantidad} productos hoy`}
                </span>
              </div>

              <div className="panaderia-card__cuerpo">
                <h3 className="panaderia-card__nombre">{panaderia.nombre}</h3>
                <p className="panaderia-card__dato">
                  📍 {panaderia.direccion ?? "Sin dirección"}
                </p>
                <p className="panaderia-card__dato">
                  🕒 {panaderia.horario ?? "Sin horario"}
                </p>

                <button
                  type="button"
                  className="btn btn--primary btn--sm panaderia-card__boton"
                  onClick={() => onVerPanaderia && onVerPanaderia(panaderia.id)}
                >
                  Ver panadería
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
