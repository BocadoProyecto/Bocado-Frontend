import "./ModalDonacion.css";

export default function ModalDonacion({ onCerrar, onSeguir }) {
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
        </section>

        <aside className="donacion__resumen">
          <h3>Tu donación</h3>
          <button type="button" className="btn donacion__donar" onClick={onSeguir}>
            Donar y seguir al pago
          </button>
          <button type="button" className="btn donacion__saltar" onClick={onSeguir}>
            Seguir sin donar
          </button>
        </aside>
      </div>
    </div>
  );
}