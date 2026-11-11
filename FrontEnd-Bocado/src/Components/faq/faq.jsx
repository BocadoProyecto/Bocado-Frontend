import { useState } from "react";
import "./faq.css";

const preguntas = [
  {
    pregunta: "¿Cuánto tiempo de fabricado tienen los excedentes?",
    respuesta:
      "Todo lo que ves en Bocado se horneó el día anterior. Las panaderías publican lo que les sobra hacia el final de la jornada, y cada producto muestra la hora en que se hizo.",
  },
  {
    pregunta: "¿Se puede abonar en efectivo?",
    respuesta:
      "Sí. Podés pagar online, o en efectivo al retirar el pedido en el local.",
  },
  {
    pregunta: "¿Qué pasa si un día no tengo excedentes?",
    respuesta:
      "No pasa nada: ¡significa que vendiste todo! No hay un mínimo de publicaciones ni penalizaciones. Publicás solo los días en que te sobra algo.",
  },
  {
    pregunta: "¿Qué pasa si no retiro mi pedido?",
    respuesta:
      "La panadería guarda tu pedido hasta su horario de cierre. Si no pasás a buscarlo, el pedido se dona automáticamente a un comedor cercano, así la comida no se desperdicia. Como el producto ya se apartó para vos, no se reembolsa.",
  },
  {
    pregunta: "¿Qué tipos de panaderías pueden sumarse?",
    respuesta:
      "Panaderías, confiterías, bizcocherías y pastelerías de barrio, chicas o grandes, siempre que estén habilitadas para vender alimentos. Si hacés pan, bizcochos o tortas y a veces te sobra, Bocado es para vos.",
  },
  {
    pregunta: "¿Tengo que cumplir con algún control de calidad?",
    respuesta:
      "Sí. Para sumarte necesitás la habilitación bromatológica vigente de tu intendencia. Los productos tienen que estar en buen estado, bien envasados y, si llevan crema o rellenos frescos, conservados en frío hasta el retiro. Si una panadería recibe reclamos repetidos, la pausamos hasta revisar el caso.",
  },
  {
    pregunta: "¿Qué hago si mi pedido no coincide con lo publicado?",
    respuesta:
      "Escribinos desde el formulario de contacto y nos comunicamos con vos para encontrar una solución.",
  },
  {
    pregunta: "¿Cómo funcionan las donaciones?",
    respuesta:
      "Los comedores y las escuelas publican en Bocado lo que necesitan. Al comprar, elegís si el pedido es para vos o para donar, y a qué comedor o escuela. Te avisamos cuando la donación se entrega. Las panaderías que participan reciben la insignia Panadería solidaria, que aparece en su perfil.",
  },
];

export const Faq = ({ onVolver }) => {
  const [abierta, setAbierta] = useState(null);

  function alternar(indice) {
    setAbierta(abierta === indice ? null : indice);
  }

  return (
    <section className="faq">
      {onVolver && (
        <button className="faq__volver" onClick={onVolver}>
          ← Volver
        </button>
      )}

      <h2 className="faq__titulo">Preguntas frecuentes</h2>
      <p className="faq__intro">
        Lo que más nos preguntan clientes y panaderías.
      </p>

      <div className="faq__lista">
        {preguntas.map((item, i) => {
          const estaAbierta = abierta === i;
          return (
            <div
              key={i}
              className={`faq__item ${estaAbierta ? "faq__item--abierta" : ""}`}
            >
              <button
                className="faq__pregunta"
                onClick={() => alternar(i)}
                aria-expanded={estaAbierta}
              >
                <span>{item.pregunta}</span>
                <span className="faq__icono" aria-hidden="true">
                  +
                </span>
              </button>

              {estaAbierta && <p className="faq__respuesta">{item.respuesta}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};
