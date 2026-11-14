import { useState, useEffect } from "react";
import "../Catalogo/Catalogo.css";
import ProductCard from "../productcard/ProductCard";

export default function Donar({ onVolver, onAgregar }) {
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

  return (
    <section className="catalogo">
      <div className="catalogo__encabezado">
        <div>
          <button type="button" className="catalogo__volver" onClick={onVolver}>
            ← Volver al pago
          </button>

          <h2 className="catalogo__titulo">Donar productos</h2>

          <p className="catalogo__subtitulo">
            Elegí qué producto querés donar para que llegue a quienes lo
            necesitan.
          </p>
        </div>
      </div>

      <div className="catalogo__grilla">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            datosPanaderia={panaderias.find(
              (p) => p.nombre === producto.panaderia,
            )}
            onAgregar={onAgregar}
            textoBoton="Donar este"
          />
        ))}
      </div>
    </section>
  );
}
