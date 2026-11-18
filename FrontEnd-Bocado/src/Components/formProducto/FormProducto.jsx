import { API_URL } from "../../config";
import { useState } from "react";
import "./FormProducto.css";


// Las mismas categorías que ya usa el catálogo
const CATEGORIAS = ["Panes", "Facturas", "Dulces", "Salados", "Tortas"];

const FORM_VACIO = {
  nombre: "",
  categoria: "",
  precioOriginal: "",
  precio: "",
  disponibles: "",
};

// panaderia: nombre de la panadería logueada (viene del login, no se escribe a mano)
function FormProducto({ panaderia, onVolver }) {
  const [datos, setDatos] = useState(FORM_VACIO);
  // Lista de fotos elegidas. Cada una guarda el archivo y una URL para la vista previa.
  const [fotos, setFotos] = useState([]);
  // true mientras el usuario arrastra archivos por encima de la zona
  const [arrastrando, setArrastrando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Una sola función para todos los campos: usa el "name" del campo
  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setError("");
    setExito("");
  }

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

  // Convierte un archivo en texto "data:image/...;base64,..." para mandarlo en el body
  function leerComoBase64(archivo) {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = () => resolve(lector.result);
      lector.onerror = reject;
      lector.readAsDataURL(archivo);
    });
  }

  async function manejarEnvio(e) {
    e.preventDefault();

    if (
      datos.nombre.trim() === "" ||
      datos.categoria === "" ||
      datos.precioOriginal === "" ||
      datos.precio === "" ||
      datos.disponibles === ""
    ) {
      setError("Completá todos los campos.");
      return;
    }
    if (Number(datos.precio) > Number(datos.precioOriginal)) {
      setError("El precio de excedente no puede ser mayor al original.");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      // por ahora mandamos solo la primera foto
      const imagenBase64 =
        fotos.length > 0 ? await leerComoBase64(fotos[0].archivo) : undefined;

      const respuesta = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: datos.nombre.trim(),
          panaderia: panaderia, // la panadería logueada
          categoria: datos.categoria,
          precio: Number(datos.precio),
          precioOriginal: Number(datos.precioOriginal),
          disponibles: Number(datos.disponibles),
          imagenBase64,
        }),
      });
      const respuestaJson = await respuesta.json();

      if (!respuesta.ok) {
        setError(respuestaJson.mensaje || "No pudimos publicar el producto.");
        return;
      }

      setExito(`¡Listo! "${respuestaJson.nombre}" ya está publicado.`);
      setDatos(FORM_VACIO);
      fotos.forEach((foto) => URL.revokeObjectURL(foto.url));
      setFotos([]);
    } catch {
      setError("No pudimos conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="form-producto">
      {onVolver && (
        <button type="button" className="catalogo__volver" onClick={onVolver}>
          ← Volver
        </button>
      )}
      <h2>Subí tus excedentes</h2>
      <p className="form-publicando">
        Publicando como <strong>{panaderia}</strong>
      </p>
      <form onSubmit={manejarEnvio} noValidate>
        <div className="form-campos">
          <p>Completá los campos</p>
          <label htmlFor="nombre">Nombre del excedente</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ej: Pan de campo"
            value={datos.nombre}
            onChange={cambiar}
          />

          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={datos.categoria}
            onChange={cambiar}
          >
            <option value="">Elegí una categoría</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label htmlFor="precioOriginal">Precio original ($)</label>
          <input
            type="number"
            id="precioOriginal"
            name="precioOriginal"
            min="0"
            placeholder="Ej: 150"
            value={datos.precioOriginal}
            onChange={cambiar}
          />

          <label htmlFor="precio">Precio de excedente ($)</label>
          <input
            type="number"
            id="precio"
            name="precio"
            min="0"
            placeholder="Ej: 90"
            value={datos.precio}
            onChange={cambiar}
          />

          <label htmlFor="disponibles">Unidades disponibles</label>
          <input
            type="number"
            id="disponibles"
            name="disponibles"
            min="1"
            placeholder="Ej: 5"
            value={datos.disponibles}
            onChange={cambiar}
          />

          {error && <p className="form-mensaje form-mensaje--error">{error}</p>}
          {exito && <p className="form-mensaje form-mensaje--exito">{exito}</p>}

          <button type="submit" disabled={enviando}>
            {enviando ? "Publicando..." : "Publicar"}
          </button>
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