import "./FormProducto.css";

function FormProducto() {
  return (
    <section>
      <h2>Subí tus excedentes</h2>
      <form>
        <label htmlFor="nombre">Nombre del excedente</label>
        <input type="text" id="nombre" placeholder="Ej: Pan de campo" />
        <label htmlFor="precio">Precio ($)</label>
        <input type="number" id="precio" min="0" placeholder="Ej: 150" />
        <label htmlFor="fechaFabricacion">Fecha de fabricación</label>
        <input type="date" id="fechaFabricacion" />
        <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
        <input type="date" id="fechaVencimiento" />
      </form>
    </section>
  );
}

export default FormProducto;
