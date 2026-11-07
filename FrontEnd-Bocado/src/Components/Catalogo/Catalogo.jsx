import { useState } from "react";
import "./Catalogo.css";
import ProductCard from "../productcard/ProductCard";
import { productos, panaderias, categorias } from "../../Data/productos";

// Para q? onVolver: vuelve a la carátula. onAgregar: se ejecuta al agregar un producto.
export default function Catalogo({ onVolver, onAgregar }) {
  // Estado de los filtros. "todas" significa "sin filtrar" son todas las oociones .
  const [panaderia, setPanaderia] = useState("todas");
  const [categoria, setCategoria] = useState("todas");

  // quedan solo con los productos que cumplen los dos filtros a la vez.
  const visibles = productos.filter((p) => {
    const cumplePanaderia = panaderia === "todas" || p.panaderia === panaderia;
    const cumpleCategoria = categoria === "todas" || p.categoria === categoria;
    return cumplePanaderia && cumpleCategoria;
  });

  const hayFiltros = panaderia !== "todas" || categoria !== "todas";

  function limpiarFiltros() {
    setPanaderia("todas");
    setCategoria("todas");
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
