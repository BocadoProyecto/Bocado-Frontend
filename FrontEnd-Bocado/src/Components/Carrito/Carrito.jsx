import "./Carrito.css";

function sumarPrecios(lista) {
  let suma = 0;
  lista.forEach((producto) => {
    suma = suma + producto.precio;
  });
  return suma;
}

function ListaCarrito({ titulo, productos, onQuitar, donacion }) {
  return (
    <div
      className={
        donacion ? "carrito__grupo carrito__grupo--donar" : "carrito__grupo"
      }
    >
      <div className="carrito__grupo-encabezado">
        <h3>{titulo}</h3>
        <span>
          {productos.length === 1
            ? "1 producto"
            : `${productos.length} productos`}
        </span>
      </div>

      <ul className="carrito__lista">
        {productos.map((producto) => (
          <li key={producto.indice} className="carrito__item">
            <span className="carrito__emoji">{producto.emoji}</span>

            <div className="carrito__info">
              <p className="carrito__panaderia">{producto.panaderia}</p>
              <p className="carrito__nombre">{producto.nombre}</p>
            </div>

            <p className="carrito__precio">${producto.precio}</p>

            <button
              type="button"
              className="carrito__quitar"
              aria-label={`Quitar ${producto.nombre}`}
              onClick={() => onQuitar(producto.indice)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="carrito__subtotal">
        <span>Subtotal</span>
        <span>${sumarPrecios(productos)}</span>
      </p>
    </div>
  );
}

export default function Carrito({
  items,
  onQuitar,
  onVaciar,
  onSeguir,
  onPagar,
}) {
  const conIndice = items.map((producto, indice) => ({ ...producto, indice }));
  const personales = conIndice.filter((producto) => !producto.donacion);
  const donaciones = conIndice.filter((producto) => producto.donacion);

  const totalPersonal = sumarPrecios(personales);
  const totalDonar = sumarPrecios(donaciones);
  const total = totalPersonal + totalDonar;

  let ahorro = 0;
  items.forEach((producto) => {
    ahorro = ahorro + (producto.precioOriginal - producto.precio);
  });

  return (
    <section className="carrito">
      <button type="button" className="carrito__volver" onClick={onSeguir}>
        ← Seguir comprando
      </button>
      <h2 className="carrito__titulo">Tu carrito</h2>

      {items.length === 0 ? (
        <div className="carrito__vacio">
          <p>Todavía no agregaste nada.</p>
          <button type="button" className="btn btn--primary" onClick={onSeguir}>
            Ver productos
          </button>
        </div>
      ) : (
        <div className="carrito__contenido">
          <div className="carrito__listas">
            {personales.length > 0 && (
              <ListaCarrito
                titulo="Para vos"
                productos={personales}
                onQuitar={onQuitar}
              />
            )}

            {donaciones.length > 0 && (
              <ListaCarrito
                titulo="Para donar 💛"
                productos={donaciones}
                onQuitar={onQuitar}
                donacion
              />
            )}
          </div>

          <aside className="carrito__resumen">
            <h3>Resumen</h3>
            {personales.length > 0 && (
              <p className="carrito__fila">
                <span>Compras personales</span>
                <span>${totalPersonal}</span>
              </p>
            )}
            {donaciones.length > 0 && (
              <p className="carrito__fila carrito__fila--donar">
                <span>Para donar</span>
                <span>${totalDonar}</span>
              </p>
            )}
            <p className="carrito__fila carrito__ahorro">
              <span>Ahorrás</span>
              <span>${ahorro}</span>
            </p>
            <p className="carrito__fila carrito__total">
              <span>Total</span>
              <span>${total}</span>
            </p>

            <button
              type="button"
              className="btn btn--primary carrito__pagar"
              onClick={onPagar}
            >
              Finalizar compra
            </button>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={onVaciar}
            >
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
