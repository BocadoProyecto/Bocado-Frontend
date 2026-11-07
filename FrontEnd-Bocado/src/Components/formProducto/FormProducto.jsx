import "./FormProducto.css";

function FormProducto() {
  return (
    <section className="form-producto">
      <h2>Subí tus excedentes</h2>
      <form>
        <p>Completá los campos</p>
        <input type="text" id="nombre" placeholder="Ej: Pan de campo" />
        <label htmlFor="preciooriginal">Precio original ($)</label>
        <input type="number" id="precio" min="0" placeholder="Ej: 150" />
        <label htmlFor="preciodescuento">Precio de excedente ($)</label>
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
      </form>
    </section>
  );
}

export default FormProducto;
