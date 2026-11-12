import { useState } from "react";
import ModalPago from "./ModalPago";
import "./Pago.css";

// El método que abre el pop up de Stripe
const METODO_TARJETA = "Tarjeta de crédito o débito";

// Pagos para elegir
const metodos = [
  METODO_TARJETA,
  "Mercado Pago",
  "Transferencia bancaria",
  "Efectivo al retirar",
];

export default function Pago({ items, onVolver, onVaciar, onDonar, onSeguir }) {
  // metodo elegido, aun no se hizo
  const [metodo, setMetodo] = useState("");
  // confirmado: solo si confirmo el pago
  const [confirmado, setConfirmado] = useState(false);
  // si el pop up de pago con tarjeta está abierto
  const [mostrarModal, setMostrarModal] = useState(false);
  // número de referencia que devuelve Stripe (solo con tarjeta)
  const [idPago, setIdPago] = useState("");

  // Total a pagar
  let total = 0;
  items.forEach((producto) => {
    total = total + producto.precio;
  });

  // Deja la compra como terminada y vacía el carrito
  function finalizarCompra() {
    setConfirmado(true);
    onVaciar();
  }

  // Botón "Pagar": con tarjeta abre el pop up, con los otros métodos confirma directo
  function confirmar() {
    if (metodo === METODO_TARJETA) {
      setMostrarModal(true);
      return;
    }
    finalizarCompra();
  }

  // Stripe cobró bien: cerramos el pop up y mostramos el gracias
  function pagoExitoso(idDelPago) {
    setIdPago(idDelPago);
    setMostrarModal(false);
    finalizarCompra();
  }

  // Para donar
  const cajaDonar = (
    <div className="pago__donar">
      <p>¿Querés ayudar? Mirá qué productos podés donar.</p>
      <button
        type="button"
        className="btn btn--primary btn--sm"
        onClick={onDonar}
      >
        Donar
      </button>
    </div>
  );

  // si compro y confirmo
  if (confirmado) {
    return (
      <section className="pago">
        <h2 className="pago__titulo">¡Compra confirmada! 🎉</h2>
        <div className="pago__caja">
          <p>Pagaste con: {metodo}</p>
          {idPago !== "" && <p>Referencia del pago: {idPago}</p>}
          <p>Gracias por ayudar a que no se desperdicie comida.</p>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={onSeguir}
          >
            Seguir comprando
          </button>
          {cajaDonar}
        </div>
      </section>
    );
  }

  return (
    <section className="pago">
      <button type="button" className="pago__volver" onClick={onVolver}>
        ← Volver al carrito
      </button>
      <h2 className="pago__titulo">Pago</h2>

      <div className="pago__contenido">
        <div className="pago__caja">
          <h3>Elegí cómo pagar</h3>
          {metodos.map((nombre) => (
            <button
              key={nombre}
              type="button"
              className={
                metodo === nombre
                  ? "pago__metodo pago__metodo--activo"
                  : "pago__metodo"
              }
              onClick={() => setMetodo(nombre)}
            >
              {nombre}
            </button>
          ))}
        </div>

        <aside className="pago__caja">
          <h3>Tu pedido</h3>
          {items.map((producto, indice) => (
            <p key={indice} className="pago__fila">
              <span>{producto.nombre}</span>
              <span>${producto.precio}</span>
            </p>
          ))}
          <p className="pago__fila pago__total">
            <span>Total</span>
            <span>${total}</span>
          </p>

          <button
            type="button"
            className="btn btn--primary pago__confirmar"
            onClick={confirmar}
            disabled={metodo === "" || items.length === 0}
          >
            Pagar
          </button>

          {cajaDonar}
        </aside>
      </div>

      {mostrarModal && (
        <ModalPago
          items={items}
          total={total}
          onCerrar={() => setMostrarModal(false)}
          onExito={pagoExitoso}
        />
      )}
    </section>
  );
}