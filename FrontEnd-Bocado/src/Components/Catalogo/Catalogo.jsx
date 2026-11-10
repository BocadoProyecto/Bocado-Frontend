import { useState, useEffect } from "react";
import "./Catalogo.css";
import ProductCard from "../productcard/ProductCard";
import FiltroDistancia from "./FiltroDistancia";
import { productos, panaderias, categorias } from "../../Data/productos";

// onVolver: vuelve a la carátula. onAgregar: se ejecuta al agregar un producto.
export default function Catalogo({ onVolver, onAgregar }) {
  // Estado de los filtros. "todas" significa "sin filtrar".
  const [panaderia, setPanaderia] = useState("todas");
  const [categoria, setCategoria] = useState("todas");
  const [ubicacion, setUbicacion] = useState(null);
  const [radio, setRadio] = useState("todos");
  const [cercanas, setCercanas] = useState(null); // panaderías que devuelve el backend
  const [errorServidor, setErrorServidor] = useState("");

  // cuando hay radio y ubicación, le pedimos al backend las panaderías cercanas
  useEffect(() => {
    if (radio === "todos" || !ubicacion) {
      return;
    }

    fetch(
      `http://localhost:3000/panaderias?lat=${ubicacion.lat}&lng=${ubicacion.lng}&radio=${radio}`
    )
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setCercanas(datos);
        setErrorServidor("");
      })
      .catch(() => {
        setErrorServidor("No pudimos conectar con el servidor.");
      });
  }, [radio, ubicacion]);

  // quedan solo los productos que cumplen los tres filtros a la vez.
  const visibles = productos.filter((p) => {
    const cumplePanaderia = panaderia === "todas" || p.panaderia === panaderia;
    const cumpleCategoria = categoria === "todas" || p.categoria === categoria;

    let cumpleDistancia = true;
    if (radio !== "todos" && ubicacion) {
      // el producto entra si su panadería está en la lista que mandó el backend
      cumpleDistancia =
        cercanas !== null && cercanas.some((c) => c.nombre === p.panaderia);
    }

    return cumplePanaderia && cumpleCategoria && cumpleDistancia;
  });

  const hayFiltros =
    panaderia !== "todas" || categoria !== "todas" || radio !== "todos";

  function limpiarFiltros() {
    setPanaderia("todas");
    setCategoria("todas");
    setRadio("todos");
  }

  return (
    <section className="catalogo" id="productos">
      <div className="catalogo__encabezado">
        <div>
          <button type="button" className="catalogo__volver" onClick={onVolver}>
            ← Volver
          </button>
          <h2 className="catalogo__titulo">Productos disponibles</h2>
          <p className="catalogo__subtitulo">
            Excedentes del día de las panaderías, a precio rebajado.
          </p>
        </div>
      </div>

      <div className="filtros">
        <label className="filtros__campo">
          <span>Panadería</span>
          <select
            value={panaderia}
            onChange={(e) => setPanaderia(e.target.value)}
          >
            <option value="todas">Todas</option>
            {panaderias.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </label>

        <FiltroDistancia
          radio={radio}
          ubicacion={ubicacion}
          onCambiarRadio={setRadio}
          onUbicacion={setUbicacion}
        />

        <label className="filtros__campo">
          <span>Producto</span>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todas">Todos</option>
            {categorias.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </label>

        {hayFiltros && (
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>
        )}

        <p className="filtros__cantidad">
          {visibles.length} {visibles.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {errorServidor && <p className="catalogo__vacio">{errorServidor}</p>}

      {visibles.length > 0 ? (
        <div className="catalogo__grilla">
          {visibles.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={onAgregar}
            />
          ))}
        </div>
      ) : (
        <p className="catalogo__vacio">
          No hay productos con esos filtros. Probá con otra combinación.
        </p>
      )}
    </section>
  );
}