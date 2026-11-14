import { useState } from "react";
import "./FormProducto.css";

function FormProducto() {
  // Lista de fotos elegidas. Cada una guarda el archivo y una URL para la vista previa.
  const [fotos, setFotos] = useState([]);
  // true mientras el usuario arrastra archivos por encima de la zona
  const [arrastrando, setArrastrando] = useState(false);

  // Recibe los archivos (del botón o del arrastre) y los suma a la lista
  function agregarFotos(archivos) {
    const nuevas = Array.from(archivos)
      .filter((archivo) => archivo.type.startsWith("image/"))
      .map((archivo) => ({
        archivo: archivo,
        url: URL.createObjectURL(archivo),
      }));
    setFotos([...fotos, ...nuevas]);
  }

  // Quita una foto de la lista según su posición
  function quitarFoto(indice) {
    URL.revokeObjectURL(fotos[indice].url);
    setFotos(fotos.filter((foto, i) => i !== indice));
  }

  // Eventos del arrastre
  function alArrastrarEncima(evento) {
    evento.preventDefault(); // sin esto, el navegador no permite soltar
    setArrastrando(true);
  }

  function alSalir() {
    setArrastrando(false);
  }

  function alSoltar(evento) {
    evento.preventDefault(); // evita que el navegador abra la imagen
    setArrastrando(false);
    agregarFotos(evento.dataTransfer.files);
  }

  return (
    <section className="form-producto">
      <h2>Subí tus excedentes</h2>
      <form>
        <div className="form-campos">
          <p>Completá los campos</p>
          <label htmlFor="nombre">Nombre del excedente</label>
          <input type="text" id="nombre" placeholder="Ej: Pan de campo" />

          <label htmlFor="precioOriginal">Precio original ($)</label>
          <input
            type="number"
            id="precioOriginal"
            min="0"
            placeholder="Ej: 150"
          />

          <label htmlFor="precioExcedente">Precio de excedente ($)</label>
          <input
            type="number"
            id="precioExcedente"
            min="0"
            placeholder="Ej: 90"
          />
          <label htmlFor="fechaFabricacion">Fecha de fabricación</label>
          <input type="date" id="fechaFabricacion" />
          <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
          <input type="date" id="fechaVencimiento" />
          <label htmlFor="sucursal">Sucursal</label>
          <select id="sucursal">
            <option value="">Elegí una sucursal</option>
            <option value="centro">Centro</option>
            <option value="pocitos">Pocitos</option>
            <option value="villa">Villa Española </option>
          </select>
          <button type="submit">Publicar</button>
        </div>
        <div className="form-fotos">
          <label
            htmlFor="fotos"
            className={arrastrando ? "zona-fotos arrastrando" : "zona-fotos"}
            onDragOver={alArrastrarEncima}
            onDragLeave={alSalir}
            onDrop={alSoltar}
          >
            <span className="zona-icono">📷</span>
            <span>Arrastrá tus fotos acá</span>
            <span className="zona-o">o</span>
            <span className="zona-boton">Subir archivos</span>
          </label>
          <input
            type="file"
            id="fotos"
            accept="image/*"
            multiple
            hidden
            onChange={(evento) => {
              agregarFotos(evento.target.files);
              evento.target.value = ""; // permite volver a elegir la misma foto
            }}
          />

          {fotos.length > 0 && (
            <div className="fotos-preview">
              {fotos.map((foto, indice) => (
                <div className="foto-item" key={foto.url}>
                  <img src={foto.url} alt={foto.archivo.name} />
                  <button
                    type="button"
                    className="foto-quitar"
                    onClick={() => quitarFoto(indice)}
                    aria-label={"Quitar " + foto.archivo.name}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export default FormProducto;
