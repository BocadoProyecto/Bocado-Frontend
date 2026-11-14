import { useState, useEffect } from "react";
import "./Carrusel.css";

const IDS_DESTACADAS = [1, 2, 18, 4, 5];

export default function Carrusel({ onVerPanaderia }) {
  const [panaderias, setPanaderias] = useState([]);
  const [errorServidor, setErrorServidor] = useState("");
  const [indice, setIndice] = useState(0);

  // se carga una sola vez, igual que en el Catalogo
  useEffect(() => {
    fetch("http://localhost:3000/panaderias")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
  // buscamos cada panadería por su id, respetando el orden de la lista
  const elegidas = IDS_DESTACADAS.map((id) => datos.find((p) => p.id === id));
  setPanaderias(elegidas.filter(Boolean)); // descarta las que no existan
})
      .catch(() => setErrorServidor("No pudimos conectar con el servidor."));
  }, []);

  const total = panaderias.length;

  function siguiente() {
    setIndice((i) => (i + 1) % total);
  }

  function anterior() {
    setIndice((i) => (i - 1 + total) % total);
  }

  // mientras carga (o si hubo error) mostramos un mensaje
  if (total === 0) {
    return (
      <section className="carrusel">
        <h2 className="carrusel__titulo">Panaderías destacadas</h2>
        <p className="carrusel__sub">
          {errorServidor || "Cargando panaderías..."}
        </p>
      </section>
    );
  }

  // Siempre se dibujan 3: la de la izquierda (-1), la del medio (0) y la de la derecha (1)
  const visibles = [-1, 0, 1].map((pos) => ({
    pos,
    idx: (indice + pos + total) % total,
  }));

  function clickEnTarjeta(pos) {
    if (pos === -1) anterior();
    if (pos === 1) siguiente();
  }

  return (
    <section className="carrusel">
      <h2 className="carrusel__titulo">Panaderías destacadas</h2>
      <p className="carrusel__sub">Conocé las panaderías que ya se suman a Bocado</p>

      <div className="carrusel__escenario">
        <button
          type="button"
          className="carrusel__flecha"
          onClick={anterior}
          aria-label="Panadería anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <div className="carrusel__ventana">
          {visibles.map(({ pos, idx }) => {
            const p = panaderias[idx];
            const esCentro = pos === 0;

            return (
              <article
                key={p.id}
                className={
                  "carrusel__card " +
                  (pos === -1
                    ? "carrusel__card--izq"
                    : pos === 1
                    ? "carrusel__card--der"
                    : "carrusel__card--centro")
                }
                onClick={() => clickEnTarjeta(pos)}
                aria-hidden={esCentro ? undefined : "true"}
              >
                <div className="carrusel__cabecera">
                  <img
                    className="carrusel__logo"
                    src={`http://localhost:3000/Imagenes/Panaderias/${p.logo}`}
                    alt={`Logo de ${p.nombre}`}
                  />
                  <h3 className="carrusel__nombre">{p.nombre}</h3>
                </div>

                <div className="carrusel__datos">
                  <p className="carrusel__dato">📍 {p.direccion}</p>
                  <p className="carrusel__dato carrusel__dato--horario">
                    🕒 {p.horario ? p.horario : "Horario no disponible"}
                  </p>
                  <p className="carrusel__dato">
                    📞 {p.telefono ? p.telefono : "Teléfono no disponible"}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn--primary btn--sm carrusel__btn"
                  tabIndex={esCentro ? 0 : -1}
                  onClick={(e) => {
                    e.stopPropagation(); // que no se mueva el carrusel al tocar el botón
                    onVerPanaderia(p.id);
                  }}
                >
                  Ir a la panadería
                </button>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="carrusel__flecha"
          onClick={siguiente}
          aria-label="Panadería siguiente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Barra de progreso: se llena sola y al terminar pasa a la siguiente.
          key={indice} la reinicia en cada cambio (también con las flechas). */}
      <div className="carrusel__barra">
        <div key={indice} className="carrusel__progreso" onAnimationEnd={siguiente} />
      </div>

      <p className="carrusel__contador">
        {indice + 1} / {total}
      </p>
    </section>
  );
}