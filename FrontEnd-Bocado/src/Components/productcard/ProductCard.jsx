import "./ProductCard.css";


// Recibe un prod y solo se ajecuta al agregar
export default function ProductCard({ producto, datosPanaderia, onAgregar, textoBoton = "Agregar" }) {
  const {
    nombre,
    panaderia,
    categoria,
    precio,
    precioOriginal,
    disponibles,
    imagen,
  } = producto;

  // muestra el porcentaje de dto
  const descuento = Math.round((1 - precio / precioOriginal) * 100);

  return (
    <article className="card">
      <div className="card__imagen">
        {imagen && (
          <img
            className="card__foto"
            src={`http://localhost:3000${imagen}`}
            alt={nombre}
          />
        )}
        <span className="card__descuento">-{descuento}%</span>
      </div>

      <div className="card__cuerpo">
        <p className="card__panaderia">
          {datosPanaderia && datosPanaderia.logo && (
            <img
              className="card__logo"
              src={`http://localhost:3000${datosPanaderia.logo}`}
              alt=""
            />
          )}
          {panaderia}
          {datosPanaderia && (
            <span className="card__info">
              <span>📍 {datosPanaderia.direccion ?? "Sin dirección"}</span>
              <span>📞 {datosPanaderia.telefono ?? "Sin teléfono"}</span>
              <span>🕒 {datosPanaderia.horario ?? "Sin horario"}</span>
            </span>
          )}
        </p>
        <h3 className="card__nombre">{nombre}</h3>
        <p className="card__categoria">{categoria}</p>

        <div className="card__precios">
          <span className="card__precio">${precio}</span>
          <span className="card__precio-original">${precioOriginal}</span>
        </div>

        <p className="card__disponibles">
          {disponibles === 1
            ? "Queda 1 unidad"
            : `Quedan ${disponibles} unidades`}
        </p>

        <button
          type="button"
          className="btn btn--primary btn--sm card__boton"
          onClick={() => onAgregar && onAgregar(producto)}
        >
          {textoBoton}
        </button>
      </div>
    </article>
  );
}