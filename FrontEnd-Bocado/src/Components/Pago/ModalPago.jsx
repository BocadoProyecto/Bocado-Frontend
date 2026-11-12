import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./ModalPago.css";

// La clave PÚBLICA de prueba (pk_test_...) va en el archivo .env.local del front
const clavePublica = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = clavePublica ? loadStripe(clavePublica) : null;

// Formulario con los datos de la tarjeta (lo dibuja Stripe adentro del pop up)
function FormularioTarjeta({ total, onCerrar, onExito }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  async function pagar(evento) {
    evento.preventDefault();

    // Stripe todavía está cargando
    if (!stripe || !elements) {
      return;
    }

    setProcesando(true);
    setError("");

    const resultado = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    // La tarjeta fue rechazada o faltan datos
    if (resultado.error) {
      setError(resultado.error.message || "No se pudo procesar el pago.");
      setProcesando(false);
      return;
    }

    // Todo salió bien
    if (
      resultado.paymentIntent &&
      resultado.paymentIntent.status === "succeeded"
    ) {
      onExito(resultado.paymentIntent.id);
      return;
    }

    setError("El pago no se completó. Probá de nuevo.");
    setProcesando(false);
  }

  return (
    <form onSubmit={pagar} className="modal-pago__form">
      <PaymentElement />

      {error !== "" && <p className="modal-pago__error">{error}</p>}

      <button
        type="submit"
        className="btn btn--primary modal-pago__pagar"
        disabled={!stripe || procesando}
      >
        {procesando ? "Procesando..." : `Pagar $${total}`}
      </button>
      <button
        type="button"
        className="btn btn--outline btn--sm modal-pago__cancelar"
        onClick={onCerrar}
        disabled={procesando}
      >
        Cancelar
      </button>
    </form>
  );
}

// El pop up. Le pide al backend crear el cobro y después muestra el formulario.
export default function ModalPago({ items, total, onCerrar, onExito }) {
  const [clientSecret, setClientSecret] = useState("");
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    let cancelado = false;

    fetch("http://localhost:3000/pagos/crear-intento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: items.map((producto) => producto.id) }),
    })
      .then(async (respuesta) => {
        const datos = await respuesta.json();
        if (!respuesta.ok) {
          throw new Error(datos.mensaje || "No se pudo iniciar el pago");
        }
        return datos;
      })
      .then((datos) => {
        if (!cancelado) {
          setClientSecret(datos.clientSecret);
        }
      })
      .catch((error) => {
        if (!cancelado) {
          setErrorCarga(
            error instanceof TypeError
              ? "No pudimos conectar con el servidor."
              : error.message
          );
        }
      });

    // si el pop up se cierra antes de que responda, ignoramos la respuesta
    return () => {
      cancelado = true;
    };
  }, [items]);

  return (
    <div className="modal-pago">
      <div
        className="modal-pago__caja"
        role="dialog"
        aria-modal="true"
        aria-label="Pagar con tarjeta"
      >
        <h3 className="modal-pago__titulo">Pagar con tarjeta</h3>
        <p className="modal-pago__total">Total: ${total}</p>

        <p className="modal-pago__aviso">
          Modo de prueba: usá la tarjeta 4242 4242 4242 4242, una fecha futura
          y cualquier CVC. No se cobra dinero real.
        </p>

        {!stripePromise && (
          <p className="modal-pago__error">
            Falta VITE_STRIPE_PUBLIC_KEY en el archivo .env.local del frontend.
          </p>
        )}

        {errorCarga !== "" && <p className="modal-pago__error">{errorCarga}</p>}

        {stripePromise && errorCarga === "" && clientSecret === "" && (
          <p className="modal-pago__cargando">Cargando formulario...</p>
        )}

        {stripePromise && clientSecret !== "" && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              locale: "es",
              appearance: {
                theme: "stripe",
                variables: { colorPrimary: "#c8692f" },
              },
            }}
          >
            <FormularioTarjeta
              total={total}
              onCerrar={onCerrar}
              onExito={onExito}
            />
          </Elements>
        )}

        {(!stripePromise || errorCarga !== "") && (
          <button
            type="button"
            className="btn btn--outline btn--sm modal-pago__cancelar"
            onClick={onCerrar}
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
}