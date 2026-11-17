import { useState, useEffect } from "react";
import ProductCard from "../productcard/ProductCard";
import "./ModalDonacion.css";

export default function ModalDonacion({
  items,
  onAgregar,
  onQuitarUno,
  onCerrar,
  onSeguir,
}) {
  const [productos, setProductos] = useState([]);
  const [panaderias, setPanaderias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.log("Error al cargar productos:", error));

    fetch("http://localhost:3000/panaderias")
      .then((respuesta) => respuesta.json())
      .then((datos) => setPanaderias(datos))
      .catch((error) => console.log("Error al cargar panaderías:", error));
  }, []);

  // Los productos del carrito marcados como donación
  const donaciones = items.filter((producto) => producto.donacion);

  // Agrupo los repetidos: "Pan de campo × 2"
  const lista = [];
  donaciones.forEach((producto) => {
    const yaEsta = lista.find((p) => p.id === producto.id);
    if (yaEsta) {
      yaEsta.cantidad = yaEsta.cantidad + 1;
    } else {
      lista.push({ ...producto, cantidad: 1 });
    }
  });

  let totalDonacion = 0;
  donaciones.forEach((producto) => {
    totalDonacion = totalDonacion + producto.precio;
  });

  return (
    <div className="donacion-fondo" onClick={onCerrar}>
      <div
        className="donacion"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donacion-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="donacion__productos">
          <p className="donacion__etiqueta">Antes de pagar</p>
          <h2 id="donacion-titulo" className="donacion__titulo">
            Lo que sobra hoy puede llegar a una mesa
          </h2>
          <p className="donacion__bajada">
            Elegí lo que quieras sumar. Lo pagás junto con tu pedido y llega a
            un comedor.
          </p>
          <div className="donacion__grilla">
            {productos.slice(0, 6).map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                datosPanaderia={panaderias.find(
                  (p) => p.nombre === producto.panaderia
                )}
                textoBoton="Donar"
                onAgregar={onAgregar}
                onQuitarUno={onQuitarUno}
                cantidad={
                  donaciones.filter((p) => p.id === producto.id).length
                }
              />
            ))}
          </div>
        </section>

        <aside className="donacion__resumen">
          <h3>Tu donación</h3>

          {lista.length === 0 ? (
            <p className="donacion__vacio">
              Todavía no sumaste productos. Tocá "Donar" en los que quieras.
            </p>
          ) : (
            <ul className="donacion__lista">
              {lista.map((producto) => (
                <li key={producto.id}>
                  <span>
                    <strong>{producto.nombre}</strong>
                    <small>{producto.panaderia}</small>
                  </span>
                  <span>× {producto.cantidad}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="donacion__total">
            <span>Total donación</span>
            <strong>${totalDonacion}</strong>
          </p>

          <button
            type="button"
            className="btn donacion__donar"
            onClick={onSeguir}
          >
            Donar y seguir al pago
          </button>
          <button
            type="button"
            className="btn donacion__saltar"
            onClick={onSeguir}
          >
            Seguir sin donar
          </button>
        </aside>
      </div>
    </div>
  );
}
