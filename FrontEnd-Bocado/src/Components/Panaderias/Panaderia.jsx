import { useState, useEffect } from "react";
import "./Panaderia.css";
import ProductCard from "../productcard/ProductCard";

// panaderiaId: cuál panadería se eligió. El resto es igual que en el Catalogo.
export default function Panaderia({
  panaderiaId,
  onVolver,
  onAgregar,
  onQuitarUno,
  items = [],
  modoDonar = false,
}) {
  const [panaderias, setPanaderias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [errorServidor, setErrorServidor] = useState("");

  // se cargan una sola vez, igual que en el Catalogo
  useEffect(() => {
    fetch("http://localhost:3000/panaderias")
      .then((respuesta) => respuesta.json())
      .then((datos) => setPanaderias(datos))
      .catch(() => setErrorServidor("No pudimos conectar con el servidor."));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch(() => setErrorServidor("No pudimos conectar con el servidor."));
  }, []);

  // buscamos la panadería que se eligió
  const panaderia = panaderias.find((p) => p.id === panaderiaId);

  // mientras carga (o si hubo error) mostramos un mensaje
  if (!panaderia) {
    return (
      <section className="panaderia">
        <button type="button" className="catalogo__volver" onClick={onVolver}>
          ← Volver
        </button>
        <p className="catalogo__vacio">
          {errorServidor || "Cargando panadería..."}
        </p>
      </section>
    );
  }

  // solo los productos de esta panadería
  const susProductos = productos.filter((p) => p.panaderia === panaderia.nombre);

  return (
    <section className="panaderia">
      <button type="button" className="catalogo__volver" onClick={onVolver}>
        ← Volver
      </button>

      <div className="panaderia__portada">
        {/* ajustamos la ruta de la imagen cuando vea ProductCard */}
                <img
          className="panaderia__logo"
          src={`http://localhost:3000/Imagenes/Panaderias/${panaderia.logo}`}
          alt={panaderia.nombre}
        />
        <div>
          <h2 className="panaderia__nombre">{panaderia.nombre}</h2>
          <p className="panaderia__dato">📍 {panaderia.direccion}</p>
          <p className="panaderia__dato">
            🕒 {panaderia.horario ? panaderia.horario : "Horario no disponible"}
          </p>
          <p className="panaderia__dato">
            📞 {panaderia.telefono ? panaderia.telefono : "Teléfono no disponible"}
          </p>
        </div>
      </div>

      <h3 className="panaderia__subtitulo">Productos de {panaderia.nombre}</h3>

      {susProductos.length > 0 ? (
        <div className="catalogo__grilla">
          {susProductos.map((producto) => {
            const cantidad = items.filter(
              (i) => i.id === producto.id && i.donacion === modoDonar
            ).length;

            return (
              <ProductCard
                key={producto.id}
                producto={producto}
                datosPanaderia={panaderia}
                onAgregar={onAgregar}
                onQuitarUno={onQuitarUno}
                cantidad={cantidad}
              />
            );
          })}
        </div>
      ) : (
        <p className="catalogo__vacio">
          Esta panadería no tiene productos disponibles hoy.
        </p>
      )}
    </section>
  );
}