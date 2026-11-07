import "./Catalogo.css";
import ProductCard from "./ProductCard";
import { productos } from "../Data/productos";

// va alos   productos que se pueden donar.
// onVolver: vuelve al pago. onAgregar: suma el producto al carrito.
export default function Donar({ onVolver, onAgregar }) {
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
            onAgregar={onAgregar}
            textoBoton="Donar este"
          />
        ))}
      </div>
    </section>
  );
}
