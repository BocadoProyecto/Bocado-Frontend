import "./Carrito.css";

export default function Carrito({
  items,
  onQuitar,
  onVaciar,
  onSeguir,
  onPagar,
}) {
  //  vamos acumulando el total y lo que se ahorra
  let total = 0;
  let ahorro = 0;
  items.forEach((producto) => {
    total = total + producto.precio;
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
          <ul className="carrito__lista">
            {items.map((producto, indice) => (
              <li key={indice} className="carrito__item">
                <span className="carrito__emoji">{producto.emoji}</span>

                <div className="carrito__info">
                  <p className="carrito__panaderia">{producto.panaderia}</p>
                  <p className="carrito__nombre">{producto.nombre}</p>
                </div>

                <p className="carrito__precio">${producto.precio}</p>

                <button
                  type="button"
                  className="carrito__quitar"
                  onClick={() => onQuitar(indice)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <aside className="carrito__resumen">
            <h3>Resumen</h3>
            <p className="carrito__fila">
              <span>Productos</span>
              <span>{items.length}</span>
            </p>
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
