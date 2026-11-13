import { useState } from "react";
import "./Carrusel.css";

// Datos de ejemplo vacíos. Cuando tu compañera tenga las panaderías reales,
// reemplazás esta lista (o la traés del back) con el mismo formato.
// imagen y logo: poné la ruta o el import de la foto; si es null se muestra un color liso.
const PANADERIAS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  nombre: "Nombre de la panadería",
  descripcion: "Acá va una breve descripción de la panadería y de lo que ofrece.",
  direccion: "Calle y número, ciudad",
  imagen: null,
  logo: null,
}));

export default function Carrusel({ onVerPanaderia }) {
  const [indice, setIndice] = useState(0);
  const total = PANADERIAS.length;

  function siguiente() {
    setIndice((i) => (i + 1) % total);
  }

  function anterior() {
    setIndice((i) => (i - 1 + total) % total);
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
            const p = PANADERIAS[idx];
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
                <div className="carrusel__banner">
                  {p.imagen && <img src={p.imagen} alt="" className="carrusel__foto" />}
                  <div className="carrusel__logo">
                    {p.logo && <img src={p.logo} alt={`Logo de ${p.nombre}`} />}
                  </div>
                </div>

                <div className="carrusel__cuerpo">
                  <h3 className="carrusel__nombre">{p.nombre}</h3>
                  <p className="carrusel__desc">{p.descripcion}</p>
                  <p className="carrusel__dir">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    {p.direccion}
                  </p>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm carrusel__btn"
                    tabIndex={esCentro ? 0 : -1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onVerPanaderia && onVerPanaderia(p.id);
                    }}
                  >
                    Ir a la panadería
                  </button>
                </div>
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